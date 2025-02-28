// Global variable to store all reports for filtering
let allReports = [];

// Load reports when page loads
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path === '/laporan' || path === '/laporan.html') {
        loadLaporan();
    }
});

// Initialize date filter with today's date when page loads
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const filterDate = document.getElementById('filterDate');
    if (filterDate) {
        filterDate.value = today;
    }
    loadLaporan();
});

async function loadLaporan(date = null) {
    try {
        const response = await fetch('/api/laporan');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        allReports = data;
        
        // Filter reports by date if specified
        let filteredReports = data;
        if (date) {
            const selectedDate = new Date(date).toDateString();
            filteredReports = data.filter(report => 
                new Date(report.tanggal).toDateString() === selectedDate
            );
        }

        // Handle visibility of empty state and table card
        const emptyState = document.getElementById('emptyState');
        const tableCard = document.querySelector('.table-card');
        
        if (filteredReports.length === 0) {
            if (emptyState) emptyState.classList.remove('d-none');
            if (tableCard) tableCard.classList.add('d-none');
        } else {
            if (emptyState) emptyState.classList.add('d-none');
            if (tableCard) tableCard.classList.remove('d-none');
        }

        // Display filtered reports
        if (document.getElementById('laporanList')) {
            displayLaporan(filteredReports);
            initializeSearch();
        }

        if (typeof updateStats === 'function') {
            updateStats(filteredReports);
        }
    } catch (error) {
        console.error('Error loading reports:', error);
        const emptyState = document.getElementById('emptyState');
        const tableCard = document.querySelector('.table-card');
        
        if (emptyState) {
            emptyState.classList.remove('d-none');
            emptyState.querySelector('.text-muted.mb-0').textContent = 
                'Error: ' + error.message;
        }
        if (tableCard) tableCard.classList.add('d-none');
        
        if (typeof updateStats === 'function') {
            updateStats([]);
        }
    }
}

// New function to filter by date
function filterByDate(date) {
    if (!date) return;
    loadLaporan(date);
}

// New function to show today's reports
function showTodayReports() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('filterDate').value = today;
    loadLaporan(today);
}

// Variabel untuk melacak apakah tampilan saat ini menampilkan semua laporan atau hanya sebagian
let showingAllReports = false;
let currentFilteredReports = [];

// Modified displayLaporan function to show only 2 items initially with "Show More" button
function displayLaporan(laporan) {
    const tbody = document.getElementById('laporanList');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (!Array.isArray(laporan) || laporan.length === 0) {
        showEmptyState(true);
        return;
    }
    
    showEmptyState(false);
    
    // Update current filtered reports
    currentFilteredReports = laporan;
    
    // Decide how many reports to show
    const reportsToShow = showingAllReports ? laporan : laporan.slice(0, 2);
    
    reportsToShow.forEach(report => {
        const reportDate = new Date(report.tanggal);
        const formattedDate = new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(reportDate);
        
        const formattedTime = reportDate.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const row = `
            <tr class="report-card">
                <td data-label="Tanggal">
                    <div class="date-info">
                        <div class="date-full">${formattedDate}</div>
                        <small class="text-muted">${formattedTime}</small>
                    </div>
                </td>
                <td data-label="Siswa">
                    <div class="student-info">
                        <span class="student-name">${escapeHtml(report.nama || '')}</span>
                        <span class="student-details">${escapeHtml(report.kelas || '')} ${escapeHtml(report.jurusan || '')}</span>
                    </div>
                </td>
                <td data-label="Laporan">
                    <div class="report-content">
                        <div class="report-title">${escapeHtml(report.title || '')}</div>
                        <div class="report-description">${escapeHtml(report.description || '')}</div>
                    </div>
                </td>
                <td data-label="Jenis">
                    <span class="badge badge-${report.jenis_pelanggaran || 'ringan'}">
                        ${report.jenis_pelanggaran || 'ringan'}
                    </span>
                </td>
                <td data-label="Aksi">
                    <div class="btn-group">
                        <button onclick="editLaporan(${report.id})" class="btn btn-sm btn-warning">
                            <i class="bi bi-pencil-square"></i> Edit
                        </button>
                        <button onclick="deleteLaporan(${report.id})" class="btn btn-sm btn-danger">
                            <i class="bi bi-trash"></i> Hapus
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Add "Show More" button if there are more records and not showing all yet
    if (!showingAllReports && laporan.length > 2) {
        tbody.innerHTML += `
            <tr class="show-more-row">
                <td colspan="5" class="text-center py-3">
                    <button onclick="showAllReports()" class="btn btn-primary">
                        <i class="bi bi-arrow-down-circle"></i> Lihat ${laporan.length - 2} Laporan Lainnya
                    </button>
                </td>
            </tr>
        `;
    }
    
    // Add "Show Less" button if showing all and there are more than 2 records
    if (showingAllReports && laporan.length > 2) {
        tbody.innerHTML += `
            <tr class="show-less-row">
                <td colspan="5" class="text-center py-3">
                    <button onclick="showLessReports()" class="btn btn-outline-primary">
                        <i class="bi bi-arrow-up-circle"></i> Tampilkan Lebih Sedikit
                    </button>
                </td>
            </tr>
        `;
    }
}

// Function to display all reports
function showAllReports() {
    showingAllReports = true;
    displayLaporan(currentFilteredReports);
}

// Function to show less reports (back to initial 2)
function showLessReports() {
    showingAllReports = false;
    displayLaporan(currentFilteredReports);
}

// Add backdrop for mobile dropdowns
function addMobileDropdownBackdrop() {
    if (!document.querySelector('.dropdown-backdrop')) {
        const backdrop = document.createElement('div');
        backdrop.classList.add('dropdown-backdrop');
        document.body.appendChild(backdrop);
        
        document.addEventListener('click', function(event) {
            if (event.target.closest('.dropdown-toggle')) {
                setTimeout(() => {
                    const dropdowns = document.querySelectorAll('.dropdown.show');
                    if (dropdowns.length > 0) {
                        backdrop.style.display = 'block';
                    }
                }, 10);
            } else if (!event.target.closest('.dropdown-menu')) {
                backdrop.style.display = 'none';
            }
        });
        
        backdrop.addEventListener('click', function() {
            document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle) dropdownToggle.click();
            });
            backdrop.style.display = 'none';
        });
    }
}

// Helper Functions
function showEmptyState(show) {
    const emptyState = document.getElementById('emptyState');
    const tableCard = document.querySelector('.table-card');
    
    if (emptyState) emptyState.classList.toggle('d-none', !show);
    if (tableCard) tableCard.classList.toggle('d-none', show);
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function initTableResponsive() {
    const tables = document.querySelectorAll('.table');
    const tableResponsive = document.querySelector('.table-responsive');
    
    if (window.innerWidth <= 576) {
        // For mobile devices, don't force min-width
        tables.forEach(table => {
            table.style.width = '100%';
            table.style.minWidth = 'auto';
        });
        
        if (tableResponsive) {
            tableResponsive.style.overflowX = 'visible';
        }
    } else {
        // For larger devices
        tables.forEach(table => {
            table.style.width = '100%';
        });
        
        if (tableResponsive) {
            tableResponsive.style.overflowX = 'auto';
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadLaporan();
    initTableResponsive();
});

// Add a function to adjust table display on mobile
function adjustTableForMobile() {
    if (window.innerWidth <= 576) {
        // Force table to fit content better on very small screens
        const table = document.querySelector('.table');
        if (table) {
            table.style.width = '100%';
            table.style.tableLayout = 'fixed';
        }
    }
}

// Call this on load and resize
window.addEventListener('resize', adjustTableForMobile);
document.addEventListener('DOMContentLoaded', adjustTableForMobile);

function getBadgeColor(jenis) {
    switch(jenis) {
        case 'ringan': return 'warning';
        case 'sedang': return 'info';
        case 'berat': return 'danger';
        default: return 'secondary';
    }
}

// Add sorting and filtering functions
let sortDirection = 'desc';
let currentFilter = 'all';

function sortByDate() {
    sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    const tbody = document.getElementById('laporanList');
    const rows = Array.from(tbody.getElementsByTagName('tr'));
    
    rows.sort((a, b) => {
        const dateA = new Date(a.cells[0].textContent);
        const dateB = new Date(b.cells[0].textContent);
        return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

// Update filter violations to work with search
function filterViolations() {
    const filters = ['all', 'ringan', 'sedang', 'berat'];
    currentFilter = filters[(filters.indexOf(currentFilter) + 1) % filters.length];
    
    const searchTerm = document.getElementById('searchLaporan')?.value.toLowerCase() || '';
    const filteredReports = allReports.filter(report => {
        const matchesSearch = 
            report.nama.toLowerCase().includes(searchTerm) ||
            report.kelas.toLowerCase().includes(searchTerm) ||
            report.jurusan.toLowerCase().includes(searchTerm) ||
            report.title.toLowerCase().includes(searchTerm);
        
        return currentFilter === 'all' 
            ? matchesSearch 
            : matchesSearch && report.jenis_pelanggaran === currentFilter;
    });
    
    displayLaporan(filteredReports);
}

function refreshList() {
    loadLaporan();
}

function initializeSearch() {
    const searchInput = document.getElementById('searchLaporan');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredReports = allReports.filter(report => 
                report.nama.toLowerCase().includes(searchTerm) ||
                report.kelas.toLowerCase().includes(searchTerm) ||
                report.jurusan.toLowerCase().includes(searchTerm) ||
                report.title.toLowerCase().includes(searchTerm)
            );
            displayLaporan(filteredReports);
        }, 300));
    }
}

async function editLaporan(id) {
    try {
        const response = await fetch(`/api/laporan/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch laporan data');
        }
        const laporan = await response.json();
        
        // Fill the form with existing data
        document.getElementById('edit_id').value = laporan.id;
        document.getElementById('edit_title').value = laporan.title;
        document.getElementById('edit_description').value = laporan.description;
        document.getElementById('edit_jenis_pelanggaran').value = laporan.jenis_pelanggaran;
        
        // Show edit modal
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    } catch (error) {
        console.error('Edit laporan error:', error);
        if (typeof showError === 'function') {
            showError('Gagal memuat data laporan: ' + error.message);
        }
    }
}

async function updateLaporan(event) {
    event.preventDefault();
    
    try {
        const id = document.getElementById('edit_id').value;
        const formData = {
            title: document.getElementById('edit_title').value,
            description: document.getElementById('edit_description').value,
            jenis_pelanggaran: document.getElementById('edit_jenis_pelanggaran').value
        };

        const response = await fetch(`/api/laporan/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to update laporan');
        }

        // Hide modal and refresh list
        const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal.hide();
        await loadLaporan(); // Refresh the list
        if (typeof showSuccess === 'function') {
            showSuccess('Laporan berhasil diupdate');
        }
    } catch (error) {
        console.error('Update laporan error:', error);
        if (typeof showError === 'function') {
            showError('Gagal mengupdate laporan: ' + error.message);
        }
    }
}

async function deleteLaporan(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
        return;
    }

    try {
        const response = await fetch(`/api/laporan/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete laporan');
        }

        await loadLaporan(); // Refresh the list
        if (typeof showSuccess === 'function') {
            showSuccess('Laporan berhasil dihapus');
        }
    } catch (error) {
        console.error('Delete laporan error:', error);
        if (typeof showError === 'function') {
            showError('Gagal menghapus laporan: ' + error.message);
        }
    }
}

async function searchHistory() {
    console.log('searchHistory called'); // added log for debugging
    const nama = document.getElementById('searchNama').value;
    const kelas = document.getElementById('searchKelas').value;
    const jurusan = document.getElementById('searchJurusan').value;
    
    try {
        const tbody = document.getElementById('laporanList');
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>`;

        const response = await fetch(`/api/laporan/history?nama=${encodeURIComponent(nama)}&kelas=${encodeURIComponent(kelas)}&jurusan=${encodeURIComponent(jurusan)}`);
        const data = await response.json();

        displayHistoryResults(data);
    } catch (error) {
        console.error('searchHistory error:', error);
        document.getElementById('laporanList').innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Gagal memuat data: ${error.message}
                </td>
            </tr>`;
    }
}

function displayHistoryResults(responseData) {
    console.log('displayHistoryResults received:', responseData);
    // Ensure that the received data is an array.
    let students = [];
    
    if (Array.isArray(responseData)) {
      students = responseData;
    } else if (responseData && typeof responseData === 'object') {
      // If it might be a single object, wrap in an array.
      students = [responseData];
    }
    
    const tbody = document.getElementById('laporanList');
    if (!tbody) {
      console.error('laporanList element not found');
      return;
    }
    
    tbody.innerHTML = '';
    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center">No results found</td></tr>`;
      return;
    }
    
    students.forEach(student => {
      const row = `
        <tr>
          <td data-label="Siswa">
            <div class="student-info">
              <span class="student-name">${student.nama}</span>
              <span class="student-details">${student.kelas} - ${student.jurusan}</span>
            </div>
          </td>
          <td data-label="Pelanggaran">
            <span class="badge bg-warning">${student.ringan} Ringan</span>
            <span class="badge bg-primary">${student.sedang} Sedang</span>
            <span class="badge bg-danger">${student.berat} Berat</span>
          </td>
          <td data-label="Total">${student.total_pelanggaran} Total</td>
          <td data-label="Aksi">
            <button class="btn btn-sm btn-primary" onclick='showHistory(${JSON.stringify(student.riwayat)})'>
              Lihat Riwayat
            </button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
}

function showHistory(riwayat) {
    const modal = new bootstrap.Modal(document.getElementById('historyModal'));
    const modalBody = document.querySelector('#historyModal .modal-body');
    
    let html = '<div class="timeline">';
    riwayat.forEach(item => {
        const date = new Date(item.tanggal).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        html += `
            <div class="timeline-item">
                <div class="date">${date}</div>
                <div class="content">
                    <h6>${item.title}</h6>
                    <span class="badge badge-${item.jenis}">${item.jenis}</span>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    modalBody.innerHTML = html;
    modal.show();
}

async function exportToExcel() {
    await excelExport.exportLaporan();
}

// Use debounce from main.js or redefine it here if needed
if (typeof debounce !== 'function') {
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
}

// Mobile dropdown enhancement - Diperbaiki untuk menghindari error null
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on mobile
  if (window.innerWidth <= 576) {
    // Create backdrop element for dropdowns
    const backdrop = document.createElement('div');
    backdrop.classList.add('dropdown-backdrop');
    document.body.appendChild(backdrop);
    
    // Add event listeners to dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', function() {
        const dropdown = this.closest('.dropdown');
        
        // Show/hide backdrop when dropdown toggles
        if (dropdown && dropdown.classList.contains('show')) {
          backdrop.style.display = 'block';
        } else {
          setTimeout(() => {
            backdrop.style.display = 'none';
          }, 150);
        }
      });
    });
    
    // Close dropdown when backdrop is clicked
    backdrop.addEventListener('click', function() {
      document.querySelectorAll('.dropdown.show').forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        if (dropdownToggle) dropdownToggle.click();
      });
    });
  }
});

function initResponsiveFeatures() {
    initMobileDropdowns();
    initTableResponsive();
    window.addEventListener('resize', initTableResponsive);
}

function initMobileDropdowns() {
    if (window.innerWidth <= 576) {
        // Check if backdrop already exists to avoid duplicates
        if (!document.querySelector('.dropdown-backdrop')) {
            const backdrop = document.createElement('div');
            backdrop.classList.add('dropdown-backdrop');
            document.body.appendChild(backdrop);
            
            // Add event listeners to dropdowns
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const dropdown = this.closest('.dropdown');
                    if (dropdown && dropdown.classList.contains('show')) {
                        backdrop.style.display = 'block';
                    } else {
                        setTimeout(() => backdrop.style.display = 'none', 150);
                    }
                });
            });
            
            // Close dropdown when backdrop is clicked
            backdrop.addEventListener('click', () => {
                document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) dropdownToggle.click();
                });
            });
        }
    }
}

function initTableResponsive() {
    const tables = document.querySelectorAll('.table');
    if (tables.length > 0) {
        if (window.innerWidth <= 576) {
            tables.forEach(table => {
                table.style.width = '100%';
                // Hapus pengaturan minWidth karena ini menyebabkan masalah di mobile
                table.style.minWidth = 'auto';
            });
        } else {
            tables.forEach(table => {
                table.style.width = '100%';
                table.style.minWidth = 'auto';
            });
        }
    }
}

// New responsive handling functions
function initResponsiveFeatures() {
    initMobileDropdowns();
    initTableResponsive();
    window.addEventListener('resize', initTableResponsive);
}

function initMobileDropdowns() {
    if (window.innerWidth <= 576) {
        const backdrop = document.createElement('div');
        backdrop.classList.add('dropdown-backdrop');
        document.body.appendChild(backdrop);
        
        // Add event listeners to dropdowns
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const dropdown = this.closest('.dropdown');
                if (dropdown.classList.contains('show')) {
                    backdrop.style.display = 'block';
                } else {
                    setTimeout(() => backdrop.style.display = 'none', 150);
                }
            });
        });
        
        // Close dropdown when backdrop is clicked
        backdrop.addEventListener('click', () => {
            document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                dropdown.querySelector('.dropdown-toggle').click();
            });
        });
    }
}

function initTableResponsive() {
    const tables = document.querySelectorAll('.table');
    if (window.innerWidth <= 576) {
        tables.forEach(table => {
            table.style.width = '100%';
            table.style.minWidth = '800px';
        });
    } else {
        tables.forEach(table => {
            table.style.width = '100%';
            table.style.minWidth = 'auto';
        });
    }
}

// Update the existing DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    loadLaporan();
    initTableResponsive();
    initResponsiveFeatures();
});
