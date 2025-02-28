# 📚 Sistem Pelaporan Pelanggaran Siswa

![image](https://i.imgur.com/BP3FbJz.jpeg)

Sistem berbasis web untuk mengelola dan melacak pelanggaran siswa. Dibuat menggunakan Node.js, Express, dan MySQL.

## 🌟 Fitur Utama

- 🔍 Pencarian siswa secara real-time
- ✍️ Input pelanggaran dengan form yang mudah
- 📊 Riwayat pelanggaran detail
- 📥 Export ke Excel dengan format rapi
- 📱 Responsif di semua perangkat
- 🎯 Filter berdasarkan tanggal & jenis
- 🔎 Pencarian cepat & akurat

## 🛠️ Teknologi

### Backend
- Node.js + Express.js
- MySQL (database)
- REST API

### Frontend
- HTML5 + CSS3
- Bootstrap 5
- JavaScript (Vanilla)
- Bootstrap Icons

### Library
- XLSX.js (export Excel)
- MySQL2 (koneksi database)
- Express.js (routing)
- Express Rate Limit (pembatasan request)
- Helmet (keamanan)

## 💻 Spesifikasi Minimum

- Node.js v14+
- MySQL v8.0+
- RAM 2GB
- Storage 500MB
- Browser modern (Chrome/Firefox/Safari/Edge)

## 🚀 Cara Install

1. Clone repositori:
```bash
git clone https://github.com/arundaya-project/SIPESIS ordinix
cd ordinix
```

2. Install dependencies:
```bash
npm install
```

3. Setup database:
```javascript
// di file src/config/database.js
{
    host: 'localhost',
    user: 'root',
    password: '', // sesuaikan
    database: 'app_osis'
}
```

4. Jalankan aplikasi:
```bash
npm run dev  // untuk development
npm start    // untuk production
```

## 📂 Struktur Project

```
ex-be/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controller/
│   │   ├── laporanController.js
│   │   └── siswaController.js
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── index.html
│   ├── routes/
│   │   ├── laporan.js
│   │   └── siswa.js
│   └── app.js
├── package.json
└── README.md
```

## 📊 Skema Database

### Tabel data_siswa
```sql
CREATE TABLE data_siswa (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    jurusan VARCHAR(50) NOT NULL
);
```

### Tabel laporan
```sql
CREATE TABLE laporan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    siswa_id INT(11) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    jenis_pelanggaran ENUM('ringan', 'sedang', 'berat') NOT NULL,
    tanggal DATETIME NOT NULL,
    FOREIGN KEY (siswa_id) REFERENCES data_siswa(id)
);
```

## 🔗 API Endpoints

### Siswa
- `GET /api/siswa/search` - Pencarian siswa

### Laporan
- `POST /api/laporan` - Buat laporan baru
- `GET /api/laporan` - Ambil semua laporan
- `GET /api/laporan/:id` - Detail laporan
- `PUT /api/laporan/:id` - Update laporan
- `DELETE /api/laporan/:id` - Hapus laporan

## 🎨 Fitur Interface

### Pelanggaran
- 🟡 Ringan (Kuning)
- 🔵 Sedang (Biru)
- 🔴 Berat (Merah)

### Excel Export
- Header berwarna
- Striping baris
- Auto-width kolom
- Format tanggal Indonesia

## 🛡️ Keamanan

- Rate limiting (100 request/15 menit)
- XSS Protection
- CORS enabled
- SQL Injection Prevention
- Content Security Policy

## 🐛 Troubleshooting

### Database Error
1. Cek MySQL service
2. Verifikasi kredensial
3. Pastikan port tersedia

### Export Error
1. Validasi data
2. Cek permission
3. Update browser

## 📈 Rencana Pengembangan

### v1.1.0
- Dashboard statistik
- Grafik pelanggaran
- Dark mode

### v1.2.0
- Multi-user role
- Backup otomatis
- Notifikasi email

---
Dibuat oleh [putra]