const mysql = require('mysql2/promise');

// First create connection without database
const initPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: ''
});

// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_osis'
};

async function initializeDatabase() {
    try {
        // Test connection first
        const testPool = mysql.createPool(dbConfig);
        await testPool.getConnection();
        
        // Create database if not exists
        await initPool.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        
        // Create main connection pool with larger timeout
        const pool = mysql.createPool({
            ...dbConfig,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            connectTimeout: 60000
        });

        // Create data_siswa table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS data_siswa (
                id INT(11) PRIMARY KEY AUTO_INCREMENT,
                nama VARCHAR(255) NOT NULL,
                kelas VARCHAR(50) NOT NULL,
                jurusan VARCHAR(50) NOT NULL
            )
        `);

        // Create laporan table if not exists with foreign key
        await pool.query(`
            CREATE TABLE IF NOT EXISTS laporan (
                id INT PRIMARY KEY AUTO_INCREMENT,
                siswa_id INT(11) NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                jenis_pelanggaran ENUM('ringan', 'sedang', 'berat') NOT NULL,
                tanggal DATETIME NOT NULL,
                FOREIGN KEY (siswa_id) REFERENCES data_siswa(id)
            )
        `);

        console.log('Database and tables initialized successfully');
        return pool;
    } catch (error) {
        console.error('Database initialization error:', error);
        throw new Error('Database initialization failed');
    }
}

// Export the promise of the initialized pool
module.exports = initializeDatabase();
