// API Functions

// Create a cache for API responses
const apiCache = {
  search: new Map(),
  laporan: null,
  lastFetchTime: {
    laporan: 0,
  },
  getCacheKey: (nama, kelas, jurusan) => `${nama}:${kelas}:${jurusan}`,
  isValid: (timestamp) => Date.now() - timestamp < 30000, // 30 seconds cache
};

// Show/hide loading with smooth transition
function toggleLoading(show) {
  const overlay = document.querySelector(".loading-overlay");
  if (!overlay) return;

  if (show) {
    overlay.classList.remove("d-none");
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      overlay.classList.add("active");
    });
  } else {
    overlay.classList.remove("active");
    // Wait for transition to complete
    setTimeout(() => {
      overlay.classList.add("d-none");
    }, 300);
  }
}

// Optimize DOM updates with Virtual DOM concept
const virtualDOM = {
  elements: new Map(),

  // Queue updates to batch DOM changes
  queue: new Set(),

  // Schedule updates for next animation frame
  scheduleUpdate() {
    if (this.queue.size === 0) {
      requestAnimationFrame(() => this.processUpdates());
    }
  },

  // Process all queued updates
  processUpdates() {
    this.queue.forEach((update) => update());
    this.queue.clear();
  },

  // Add element to virtual DOM
  register(id, element) {
    this.elements.set(id, element);
  },

  // Update element content
  update(id, content) {
    this.queue.add(() => {
      const element = this.elements.get(id);
      if (element) {
        if (element.innerHTML !== content) {
          element.innerHTML = content;
        }
      }
    });
    this.scheduleUpdate();
  },
};

async function searchSiswa() {
  try {
    const nama = document.getElementById("nama")?.value || "";
    const kelas = document.getElementById("kelas")?.value || "";
    const jurusan = document.getElementById("jurusan")?.value || "";

    // Clear results if all fields are empty
    if (!nama && !kelas && !jurusan) {
      document.getElementById("searchResults").innerHTML = "";
      return;
    }

    // Show skeleton loading instead of spinner for smoother experience
    document.getElementById("searchResults").innerHTML = Array(3)
      .fill(0)
      .map(
        () => `
      <tr>
        <td><div class="skeleton" style="height: 20px; width: 80%;"></div></td>
        <td><div class="skeleton" style="height: 20px; width: 40px;"></div></td>
        <td><div class="skeleton" style="height: 20px; width: 60px;"></div></td>
        <td><div class="skeleton" style="height: 30px; width: 60px;"></div></td>
      </tr>
    `
      )
      .join("");

    // Check cache first
    const cacheKey = apiCache.getCacheKey(nama, kelas, jurusan);
    const cachedResponse = apiCache.search.get(cacheKey);

    let data;
    if (cachedResponse && apiCache.isValid(cachedResponse.timestamp)) {
      console.log("Using cached search results");
      data = cachedResponse.data;
    } else {
      const response = await fetch(
        `/api/siswa/search?nama=${encodeURIComponent(
          nama
        )}&kelas=${encodeURIComponent(kelas)}&jurusan=${encodeURIComponent(
          jurusan
        )}`
      );
      data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error searching students");

      // Store in cache
      apiCache.search.set(cacheKey, {
        timestamp: Date.now(),
        data: data,
      });
    }

    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => {
      displaySearchResults(data);
    });
  } catch (error) {
    showError("Gagal mencari data siswa: " + error.message);
    document.getElementById("searchResults").innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-danger">
          Error: ${error.message}
        </td>
      </tr>`;
  }
}

function displaySearchResults(responseData) {
  console.log("displaySearchResults received:", responseData);
  let students = [];

  // Process the data
  try {
    if (Array.isArray(responseData)) {
      students = responseData;
    } else if (
      responseData &&
      responseData.data &&
      Array.isArray(responseData.data)
    ) {
      students = responseData.data;
    } else if (responseData && typeof responseData === "object") {
      students = Object.values(responseData);
    }
  } catch (error) {
    console.error("Error processing response data:", error);
    students = [];
  }

  if (!Array.isArray(students)) {
    console.error("After processing, students is not an array:", students);
    students = [];
  }

  const tbody = document.getElementById("searchResults");
  if (!tbody) {
    console.error("searchResults element not found");
    return;
  }

  // Build HTML string once instead of multiple DOM operations
  let html = "";

  if (students.length === 0) {
    html = `<tr><td colspan="4" class="text-center">No results found</td></tr>`;
  } else {
    // Prepare all rows at once
    students.forEach((student, index) => {
      html += `
        <tr class="search-result-row" style="opacity: 0; transform: translateY(10px);">
          <td>${student.nama}</td>
          <td>${student.kelas}</td>
          <td>${student.jurusan}</td>
          <td>
            <button onclick="selectSiswa(${student.id}, '${student.nama}')" class="btn btn-sm btn-primary">
              Pilih
            </button>
          </td>
        </tr>
      `;
    });
  }

  // Single DOM update
  tbody.innerHTML = html;

  // Animate rows with staggered timing using requestAnimationFrame
  if (students.length > 0) {
    const rows = tbody.querySelectorAll(".search-result-row");

    rows.forEach((row, index) => {
      // Stagger animations for smoother rendering
      setTimeout(() => {
        requestAnimationFrame(() => {
          row.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          row.style.opacity = "1";
          row.style.transform = "translateY(0)";
        });
      }, index * 50);
    });
  }
}

function selectSiswa(id, nama) {
  const siswaIdInput = document.getElementById("siswa_id");
  const selectedSiswaInput = document.getElementById("selectedSiswa");

  if (siswaIdInput && selectedSiswaInput) {
    // Apply smooth highlight effect
    selectedSiswaInput.style.transition = "all 0.3s ease";

    // Set values
    siswaIdInput.value = id;
    selectedSiswaInput.value = nama;

    // Apply visual feedback with animation
    selectedSiswaInput.style.backgroundColor = "rgba(79, 70, 229, 0.1)";
    selectedSiswaInput.style.transform = "scale(1.02)";

    // Reset after animation
    setTimeout(() => {
      selectedSiswaInput.style.backgroundColor = "";
      selectedSiswaInput.style.transform = "";
    }, 800);

    // Show a toast notification
    Toast.success(`Siswa "${nama}" berhasil dipilih`, "Siswa Terpilih");
  }
}

// Optimized dashboard stats loading
async function loadDashboardStats() {
  try {
    const now = Date.now();

    // Show skeleton loaders first for instant feedback
    const placeholders = ["totalLaporan", "todayLaporan", "totalSiswa"];
    placeholders.forEach((id) => {
      const el = document.getElementById(id);
      if (el)
        el.innerHTML =
          '<div class="skeleton" style="height: 36px; width: 60px; border-radius: 4px;"></div>';
    });

    // Use cached data if it's recent enough (30 seconds)
    if (apiCache.laporan && now - apiCache.lastFetchTime.laporan < 30000) {
      console.log("Using cached dashboard stats");
      updateStats(apiCache.laporan);
      return;
    }

    const response = await fetch("/api/laporan");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log("Dashboard stats data:", data);

    // Cache the data
    apiCache.laporan = data;
    apiCache.lastFetchTime.laporan = now;

    // Use requestAnimationFrame for smoother UI updates
    requestAnimationFrame(() => {
      updateStats(data);
    });
  } catch (error) {
    console.error("Error loading dashboard stats:", error);
    updateStats([]);
  }
}

// Initialize page with optimized event listeners
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const path = window.location.pathname;

    // Add passive flag to common events for better scrolling performance
    document.addEventListener("scroll", () => {}, { passive: true });
    document.addEventListener("touchstart", () => {}, { passive: true });

    // Apply hardware acceleration to animated elements
    const animatedElements = document.querySelectorAll(
      ".card, .stats-card, .btn"
    );
    animatedElements.forEach((el) => {
      el.classList.add("gpu-accelerated");
    });

    if (path === "/" || path === "/index.html") {
      // For dashboard, fetch stats
      loadDashboardStats();

      // Optionally, initialize search form and laporan form
      const laporanForm = document.getElementById("laporanForm");
      const namaInput = document.getElementById("nama");
      const kelasSelect = document.getElementById("kelas");
      const jurusanSelect = document.getElementById("jurusan");

      if (laporanForm) {
        laporanForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          // Show loading state on button
          const submitButton = laporanForm.querySelector(
            'button[type="submit"]'
          );
          const originalText = submitButton.innerHTML;
          submitButton.disabled = true;
          submitButton.innerHTML = `
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Processing...
        `;

          const siswa_id = document.getElementById("siswa_id").value;
          if (!siswa_id) {
            showError("Silahkan pilih siswa terlebih dahulu");
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            return;
          }

          const formData = {
            siswa_id,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            jenis_pelanggaran:
              document.getElementById("jenis_pelanggaran").value,
          };

          try {
            toggleLoading(true);

            const response = await fetch("/api/laporan", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });

            toggleLoading(false);

            if (response.ok) {
              showSuccess("Laporan berhasil dibuat");

              // Reset form with smooth transition
              const formElements = laporanForm.querySelectorAll(
                'input:not([type="hidden"]), textarea, select'
              );
              formElements.forEach((el) => {
                el.style.transition = "background-color 0.3s ease";
                el.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
              });

              setTimeout(() => {
                formElements.forEach((el) => {
                  el.style.backgroundColor = "";
                });
                laporanForm.reset();
              }, 600);

              // Invalidate cache to force refresh
              apiCache.lastFetchTime.laporan = 0;

              // Animate stats update
              setTimeout(() => {
                loadDashboardStats();
              }, 300);
            } else {
              const errorData = await response.json();
              showError(errorData.message || "Error creating report");
            }
          } catch (error) {
            toggleLoading(false);
            showError("Error creating report: " + error.message);
          } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
          }
        });
      }

      // Initialize search with optimized event listeners
      if (namaInput) {
        namaInput.addEventListener(
          "input",
          debounce(() => {
            if (!namaInput.value.trim()) {
              if (kelasSelect) kelasSelect.value = "";
              if (jurusanSelect) jurusanSelect.value = "";
            }
            searchSiswa();
          }, 300),
          { passive: true }
        );
      }

      if (kelasSelect) {
        kelasSelect.addEventListener(
          "change",
          () => {
            if (
              !kelasSelect.value &&
              !document.getElementById("nama").value &&
              !document.getElementById("jurusan").value
            ) {
              document.getElementById("searchResults").innerHTML = "";
              return;
            }
            searchSiswa();
          },
          { passive: true }
        );
      }

      if (jurusanSelect) {
        jurusanSelect.addEventListener(
          "change",
          () => {
            if (
              !jurusanSelect.value &&
              !document.getElementById("nama").value &&
              !document.getElementById("kelas").value
            ) {
              document.getElementById("searchResults").innerHTML = "";
              return;
            }
            searchSiswa();
          },
          { passive: true }
        );
      }
    }

    // Use preconnect for faster API connections
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "/api";
    document.head.appendChild(preconnect);

    // Register elements for virtual DOM
    [
      "searchResults",
      "laporanList",
      "totalLaporan",
      "todayLaporan",
      "totalSiswa",
    ].forEach((id) => {
      const element = document.getElementById(id);
      if (element) virtualDOM.register(id, element);
    });

    // Add hardware acceleration classes
    document.querySelectorAll(".card, .table, .toast").forEach((element) => {
      element.classList.add("hw-accelerated");
    });

    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener(
      "scroll",
      () => {
        if (!document.body.classList.contains("is-scrolling")) {
          document.body.classList.add("is-scrolling");
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          document.body.classList.remove("is-scrolling");
        }, 150);
      },
      { passive: true }
    );

    // Add page transition effect
    document.querySelector(".main-wrapper").classList.add("page-transition");
  },
  { passive: true }
);

// Replace utility functions with Toast notifications
function showError(message) {
  console.log("Showing error toast:", message);

  // Use new Toast system instead of old alerts
  if (window.Toast) {
    // Ensure Toast is initialized
    if (!window.Toast.container) {
      window.Toast.init();
    }
    window.Toast.error(message);
  } else {
    // Fallback to old method if Toast is not available
    console.warn("Toast not available, falling back to alert div");
    const errorDiv = document.getElementById("errorAlert");
    const errorMessage = document.getElementById("errorMessage");

    if (errorDiv && errorMessage) {
      errorMessage.textContent = message;
      errorDiv.classList.remove("d-none");

      // Auto-hide after delay
      setTimeout(() => {
        errorDiv.classList.add("d-none");
      }, 5000);
    } else {
      // Last resort fallback
      alert(message);
    }
  }
}

function showSuccess(message) {
  console.log("Showing success toast:", message);

  // Use new Toast system instead of old alerts
  if (window.Toast) {
    // Ensure Toast is initialized
    if (!window.Toast.container) {
      window.Toast.init();
    }
    window.Toast.success(message);
  } else {
    // Fallback to old method if Toast is not available
    console.warn("Toast not available, falling back to alert div");
    const successDiv = document.getElementById("successAlert");
    const successMessage = document.getElementById("successMessage");

    if (successDiv && successMessage) {
      successMessage.textContent = message;
      successDiv.classList.remove("d-none");

      // Auto-hide after delay
      setTimeout(() => {
        successDiv.classList.add("d-none");
      }, 3000);
    } else {
      // Last resort fallback
      alert(message);
    }
  }
}

// Optimized debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smoother stats updates with animation
function updateStats(data = []) {
  console.log("Updating stats with data:", data);

  try {
    const stats = {
      totalLaporan: document.getElementById("totalLaporan"),
      todayLaporan: document.getElementById("todayLaporan"),
      totalSiswa: document.getElementById("totalSiswa"),
    };

    // Calculate values first
    const totalCount = data.length;
    const today = new Date().toDateString();
    const todayCount = data.filter(
      (report) => new Date(report.tanggal).toDateString() === today
    ).length;
    const uniqueStudents = new Set(data.map((report) => report.siswa_id)).size;

    // Animate number updates
    if (stats.totalLaporan) animateNumber(stats.totalLaporan, totalCount);
    if (stats.todayLaporan) animateNumber(stats.todayLaporan, todayCount);
    if (stats.totalSiswa) animateNumber(stats.totalSiswa, uniqueStudents);

    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      Object.entries(stats).forEach(([key, element]) => {
        if (element) {
          virtualDOM.update(key, element.textContent);
        }
      });
    });
  } catch (error) {
    console.error("Error updating stats:", error);
  }
}

// Smooth number animation
function animateNumber(element, targetNumber) {
  const duration = 1000; // ms
  const startNumber = parseInt(element.textContent) || 0;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // Use easeOutExpo for smooth deceleration
    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    const currentNumber = Math.floor(
      startNumber + (targetNumber - startNumber) * easeOutExpo
    );
    element.textContent = currentNumber;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = targetNumber; // Ensure final value is exact
    }
  }

  requestAnimationFrame(updateNumber);
}
