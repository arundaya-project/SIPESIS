let pool;
require('../config/database')
    .then(connection => {
        pool = connection;
    })
    .catch(err => console.error('Failed to initialize database:', err));

class SiswaController {
    constructor() {
        // Bind all methods to this instance
        this.searchSiswa = this.searchSiswa.bind(this);
    }

    async searchSiswa(req, res) {
        try {
            const { nama, kelas, jurusan } = req.query;
            let conditions = [];
            let params = [];

            if (!nama && !kelas && !jurusan) {
                return res.json([]);
            }

            if (nama) {
                conditions.push('nama LIKE ?');
                params.push(`%${nama}%`);
            }
            if (kelas) {
                conditions.push('kelas LIKE ?');
                params.push(`${kelas}%`);
            }
            if (jurusan) {
                conditions.push('jurusan = ?');
                params.push(jurusan);
            }

            const query = `
                SELECT * FROM data_siswa 
                ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
                ORDER BY nama ASC
                LIMIT 50`;

            const [rows] = await pool.query(query, params);
            res.json(rows);
        } catch (error) {
            console.error('Search siswa error:', error);
            res.status(500).json({ 
                message: "Gagal mencari data siswa" 
            });
        }
    }
}

module.exports = new SiswaController();
