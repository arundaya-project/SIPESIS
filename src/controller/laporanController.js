let pool;
require("../config/database")
  .then((connection) => {
    pool = connection;
  })
  .catch((err) => console.error("Failed to initialize database:", err));

class LaporanController {
  constructor() {
    // Bind all methods to this instance
    this.createLaporan = this.createLaporan.bind(this);
    this.getAllLaporan = this.getAllLaporan.bind(this);
    this.getLaporanHistory = this.getLaporanHistory.bind(this);
    this.getLaporanById = this.getLaporanById.bind(this);
    this.updateLaporan = this.updateLaporan.bind(this);
    this.deleteLaporan = this.deleteLaporan.bind(this);
  }

  async createLaporan(req, res) {
    try {
      const { siswa_id, title, description, jenis_pelanggaran } = req.body;
      const date = new Date();

      const [siswa] = await pool.query(
        "SELECT * FROM data_siswa WHERE id = ?",
        [siswa_id]
      );
      if (siswa.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Get the latest report ID
      const [latestReport] = await pool.query(
        "SELECT id FROM laporan ORDER BY id DESC LIMIT 1"
      );

      let nextId = 1; // Default starting ID if no reports exist
      if (latestReport.length > 0) {
        // If the ID is numeric, increment it
        const latestId = parseInt(latestReport[0].id);
        if (!isNaN(latestId)) {
          nextId = latestId + 1;
        }
      }

      const [result] = await pool.query(
        "INSERT INTO laporan (id, siswa_id, title, description, jenis_pelanggaran, tanggal) VALUES (?, ?, ?, ?, ?, ?)",
        [nextId, siswa_id, title, description, jenis_pelanggaran, date]
      );

      res.status(201).json({
        id: nextId,
        siswa_id,
        title,
        description,
        jenis_pelanggaran,
        tanggal: date,
      });
    } catch (error) {
      console.error("Create laporan error:", error);
      res.status(500).json({ message: "Error creating report" });
    }
  }

  async getAllLaporan(req, res) {
    try {
      const [rows] = await pool.query(`
                SELECT 
                    l.*, 
                    s.nama, 
                    s.kelas, 
                    s.jurusan 
                FROM laporan l 
                JOIN data_siswa s ON l.siswa_id = s.id
                ORDER BY l.tanggal DESC
            `);
      res.json(rows || []);
    } catch (error) {
      console.error("Get laporan error:", error);
      res.status(500).json({ message: "Gagal memuat data laporan" });
    }
  }

  async getLaporanHistory(req, res) {
    try {
      const { nama, kelas, jurusan } = req.query;
      let conditions = [];
      let params = [];

      if (nama) {
        conditions.push("s.nama LIKE ?");
        params.push(`%${nama}%`);
      }
      if (kelas) {
        conditions.push("s.kelas = ?");
        params.push(kelas);
      }
      if (jurusan) {
        conditions.push("s.jurusan = ?");
        params.push(jurusan);
      }

      const whereClause = conditions.length
        ? "WHERE " + conditions.join(" AND ")
        : "";
      const query = `
                SELECT 
                    s.nama, 
                    s.kelas, 
                    s.jurusan,
                    COUNT(l.id) as total_pelanggaran,
                    SUM(CASE WHEN l.jenis_pelanggaran = 'ringan' THEN 1 ELSE 0 END) as ringan,
                    SUM(CASE WHEN l.jenis_pelanggaran = 'sedang' THEN 1 ELSE 0 END) as sedang,
                    SUM(CASE WHEN l.jenis_pelanggaran = 'berat' THEN 1 ELSE 0 END) as berat,
                    GROUP_CONCAT(
                        JSON_OBJECT(
                            'id', l.id,
                            'tanggal', l.tanggal,
                            'title', l.title,
                            'jenis', l.jenis_pelanggaran
                        )
                    ) as riwayat
                FROM data_siswa s
                LEFT JOIN laporan l ON s.id = l.siswa_id
                ${whereClause}
                GROUP BY s.id
                HAVING COUNT(l.id) > 0
                ORDER BY total_pelanggaran DESC`;

      const [rows] = await pool.query(query, params);
      res.json(
        rows.map((row) => ({
          ...row,
          riwayat: row.riwayat ? JSON.parse(`[${row.riwayat}]`) : [],
        }))
      );
    } catch (error) {
      console.error("History laporan error:", error);
      res.status(500).json({ message: "Gagal memuat riwayat pelanggaran" });
    }
  }

  async getLaporanById(req, res) {
    try {
      const [rows] = await pool.query("SELECT * FROM laporan WHERE id = ?", [
        req.params.id,
      ]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Get laporan by ID error:", error);
      res.status(500).json({ message: "Error fetching report" });
    }
  }

  async updateLaporan(req, res) {
    try {
      const { title, description, jenis_pelanggaran } = req.body;
      const [result] = await pool.query(
        "UPDATE laporan SET title = ?, description = ?, jenis_pelanggaran = ? WHERE id = ?",
        [title, description, jenis_pelanggaran, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Laporan tidak ditemukan" });
      }

      res.json({ message: "Laporan berhasil diupdate" });
    } catch (error) {
      console.error("Update laporan error:", error);
      res.status(500).json({ message: "Gagal mengupdate laporan" });
    }
  }

  async deleteLaporan(req, res) {
    try {
      const [result] = await pool.query("DELETE FROM laporan WHERE id = ?", [
        req.params.id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Laporan tidak ditemukan" });
      }

      res.json({ message: "Laporan berhasil dihapus" });
    } catch (error) {
      console.error("Delete laporan error:", error);
      res.status(500).json({ message: "Gagal menghapus laporan" });
    }
  }
}

module.exports = new LaporanController();
