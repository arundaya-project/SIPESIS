const express = require('express');
const app = express();
const path = require('path');
const laporanRoutes = require('./routes/laporan');
const siswaRoutes = require('./routes/siswa');

const host = '0.0.0.0';  // Mendengarkan pada semua interface jaringan
const port = process.env.PORT || 3000;

// Security headers middleware
app.use((req, res, next) => {
    // Remove existing CSP headers if any
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('Content-Security-Policy-Report-Only');
    
    // Set custom security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Set permissive CSP header
    res.setHeader(
        'Content-Security-Policy',
        [
            "default-src 'self' https: http: data: blob: 'unsafe-inline' 'unsafe-eval'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
            "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
            "img-src 'self' data: https:",
            "connect-src 'self'"
        ].join('; ')
    );
    // Log security headers application with timestamp and request details
    console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path} - Security headers applied`);
    next();
});

// Basic middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/laporan', laporanRoutes);
app.use('/api/siswa', siswaRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/laporan', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'laporan.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
    // Tampilkan IP lokal untuk memudahkan akses
    const networkInterfaces = require('os').networkInterfaces();
    const addresses = [];
    for (const k in networkInterfaces) {
        for (const k2 of networkInterfaces[k]) {
            if (k2.family === 'IPv4' && !k2.internal) {
                addresses.push(k2.address);
            }
        }
    }
    console.log('Available on:');
    addresses.forEach(addr => {
        console.log(`  http://${addr}:${port}`);
    });
});