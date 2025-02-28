// API Functions
async function searchSiswa() {
    try {
        const nama = document.getElementById('nama')?.value || '';
        const kelas = document.getElementById('kelas')?.value || '';
        const jurusan = document.getElementById('jurusan')?.value || '';

        // Clear results if all fields are empty
        if (!nama && !kelas && !jurusan) {
            document.getElementById('searchResults').innerHTML = '';
            return;
        }

        // Show loading state
        document.getElementById('searchResults').innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>`;

        const response = await fetch(`/api/siswa/search?nama=${encodeURIComponent(nama)}&kelas=${encodeURIComponent(kelas)}&jurusan=${encodeURIComponent(jurusan)}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Error searching students');
        
        displaySearchResults(data);
    } catch (error) {
        showError('Gagal mencari data siswa: ' + error.message);
        document.getElementById('searchResults').innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">
                    Error: ${error.message}
                </td>
            </tr>`;
    }
}

function displaySearchResults(responseData) {
    console.log('displaySearchResults received:', responseData);
    let students = [];
    
    // If responseData is an array, use it directly.
    if (Array.isArray(responseData)) {
        students = responseData;
    }
    // If responseData is an object with a data field, use that.
    else if (responseData && responseData.data && Array.isArray(responseData.data)) {
        students = responseData.data;
    }
    // If responseData is an object but not an array, wrap it or convert its values to an array.
    else if (responseData && typeof responseData === 'object') {
        students = Object.values(responseData);
    }
    
    if (!Array.isArray(students)) {
        console.error('After processing, students is not an array:', students);
        students = [];
    }
    
    const tbody = document.getElementById('searchResults');
    if (!tbody) {
        console.error('searchResults element not found');
        return;
    }
    
    tbody.innerHTML = '';
    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center">No results found</td></tr>`;
        return;
    }
    
    students.forEach(student => {
        const row = `
            <tr>
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
        tbody.innerHTML += row;
    });
}

function selectSiswa(id, nama) {
    document.getElementById('siswa_id').value = id;
    document.getElementById('selectedSiswa').value = nama;
}

// New function to fetch and update dashboard stats only
async function loadDashboardStats() {
    try {
        const response = await fetch('/api/laporan');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Dashboard stats data:', data);
        updateStats(data);  // update stats in dashboard
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        updateStats([]);
    }
}

// Initialize page based on current location
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;

    if (path === '/' || path === '/index.html') {
        // For dashboard, fetch stats (and ensure the stats elements exist)
        loadDashboardStats();
        
        // Optionally, if your dashboard also includes a search form or laporanForm, initialize those.
        const laporanForm = document.getElementById('laporanForm');
        const namaInput = document.getElementById('nama');
        const kelasSelect = document.getElementById('kelas');
        const jurusanSelect = document.getElementById('jurusan');
        if (laporanForm) {
            laporanForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const siswa_id = document.getElementById('siswa_id').value;
                if (!siswa_id) {
                    showError('Silahkan pilih siswa terlebih dahulu');
                    return;
                }
                const formData = {
                    siswa_id,
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    jenis_pelanggaran: document.getElementById('jenis_pelanggaran').value
                };

                try {
                    const response = await fetch('/api/laporan', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    if (response.ok) {
                        alert('Laporan berhasil dibuat');
                        laporanForm.reset();
                        loadDashboardStats(); // refresh stats after adding a report
                    } else {
                        alert('Error creating report');
                    }
                } catch (error) {
                    alert('Error creating report');
                }
            });
        }
        // Also initialize search for siswa if needed:
        if (namaInput) {
            namaInput.addEventListener('input', debounce(() => {
                if (!namaInput.value.trim()) {
                    // Clear other inputs when name is cleared
                    if (kelasSelect) kelasSelect.value = '';
                    if (jurusanSelect) jurusanSelect.value = '';
                }
                searchSiswa();
            }, 500));
        }
        if (kelasSelect) {
            kelasSelect.addEventListener('change', () => {
                if (!kelasSelect.value && !document.getElementById('nama').value && !document.getElementById('jurusan').value) {
                    document.getElementById('searchResults').innerHTML = '';
                    return;
                }
                searchSiswa();
            });
        }
        if (jurusanSelect) {
            jurusanSelect.addEventListener('change', () => {
                if (!jurusanSelect.value && !document.getElementById('nama').value && !document.getElementById('kelas').value) {
                    document.getElementById('searchResults').innerHTML = '';
                    return;
                }
                searchSiswa();
            });
        }
    }
});

// Utility functions
function showError(message) {
    const errorDiv = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    if (errorDiv && errorMessage) {
        errorMessage.textContent = message;
        errorDiv.classList.remove('d-none');
    }
}

function showSuccess(message) {
    const successDiv = document.getElementById('successAlert');
    const successMessage = document.getElementById('successMessage');
    if (successDiv && successMessage) {
        successMessage.textContent = message;
        successDiv.classList.remove('d-none');
        setTimeout(() => {
            successDiv.classList.add('d-none');
        }, 3000);
    }
}

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

function updateStats(data = []) {
    console.log('Updating stats with data:', data); // Debug log
    
    try {
        const totalLaporan = document.getElementById('totalLaporan');
        const todayLaporan = document.getElementById('todayLaporan');
        const totalSiswa = document.getElementById('totalSiswa');

        if (totalLaporan) totalLaporan.textContent = data.length;

        if (todayLaporan) {
            const today = new Date().toDateString();
            const todayCount = data.filter(report => new Date(report.tanggal).toDateString() === today).length;
            todayLaporan.textContent = todayCount;
        }
        
        if (totalSiswa) {
            const uniqueStudents = new Set(data.map(report => report.siswa_id)).size;
            totalSiswa.textContent = uniqueStudents;
        }
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}
