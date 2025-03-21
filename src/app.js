const express = require("express");
const app = express();
const path = require("path");
const laporanRoutes = require("./routes/laporan");
const siswaRoutes = require("./routes/siswa");

const host = "0.0.0.0"; // Mendengarkan pada semua interface jaringan

// Security headers middleware
app.use((req, res, next) => {
  // Remove existing CSP headers if any
  res.removeHeader("Content-Security-Policy");
  res.removeHeader("Content-Security-Policy-Report-Only");

  // Set custom security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Set permissive CSP header
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self' https: http: data: blob: 'unsafe-inline' 'unsafe-eval'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "img-src 'self' data: https:",
      "connect-src 'self'",
    ].join("; ")
  );
  // Log security headers application with timestamp and request details
  console.log(
    `[${new Date().toISOString()}] ${req.ip} ${req.method} ${
      req.path
    } - Security hea ders applied`
  );
  next();
});

// Basic middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Simple logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/laporan", laporanRoutes);
app.use("/api/siswa", siswaRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/laporan", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "laporan.html"));
});

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const startServer = (initialPort) => {
  const server = app
    .listen(initialPort, host)
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(
          `Port ${initialPort} is busy, trying ${initialPort + 1}...`
        );
        // Try the next port
        startServer(initialPort + 1);
      } else {
        console.error("Server error:", err);
      }
    })
    .on("listening", () => {
      const actualPort = server.address().port;
      console.log(`\n=== SERVER STARTED SUCCESSFULLY ===`);
      console.log(`Server running at http://${host}:${actualPort}`);

      // Tampilkan IP lokal untuk memudahkan akses
      const networkInterfaces = require("os").networkInterfaces();
      const addresses = [];
      for (const k in networkInterfaces) {
        for (const k2 of networkInterfaces[k]) {
          if (k2.family === "IPv4" && !k2.internal) {
            addresses.push(k2.address);
          }
        }
      }

      if (addresses.length > 0) {
        console.log("\nAccess on your local network:");
        addresses.forEach((addr) => {
          console.log(`  → http://${addr}:${actualPort}`);
        });

        console.log("\nFor Android devices:");
        console.log(
          "1. Make sure your Android device is on the same WiFi network as this computer"
        );
        console.log(
          "2. Check if you can open a browser and navigate to any of these addresses:"
        );
        addresses.forEach((addr) => {
          console.log(`   http://${addr}:${actualPort}`);
        });
        console.log(
          "3. If still not working, try disabling firewall or adding an exception for port",
          actualPort
        );
        console.log(
          "4. Some Android devices may need you to use the device's actual IP with the port\n"
        );
      } else {
        console.log(
          "No network interfaces found. Server might only be accessible locally."
        );
      }

      console.log("Press Ctrl+C to stop the server");
      console.log("===============================\n");
    });
};

// Start the server with the initial port
const initialPort = process.env.PORT || 3000;
startServer(initialPort);
