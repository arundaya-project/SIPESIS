class ExcelExport {
    constructor() {
        // Definisikan border yang solid dan jelas
        this.allBorders = {
            top: { style: "thin", color: { auto: true } },
            bottom: { style: "thin", color: { auto: true } },
            left: { style: "thin", color: { auto: true } },
            right: { style: "thin", color: { auto: true } }
        };
        
        this.thickBorders = {
            top: { style: "medium", color: { auto: true } },
            bottom: { style: "medium", color: { auto: true } },
            left: { style: "medium", color: { auto: true } },
            right: { style: "medium", color: { auto: true } }
        };

        // Style untuk judul utama
        this.titleStyle = {
            font: { 
                bold: true, 
                size: 16,
                name: "Arial"
            },
            alignment: { 
                horizontal: "center", 
                vertical: "center"
            },
            border: this.thickBorders,
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: { rgb: "D9D9D9" } // Light gray
            }
        };

        // Style untuk header tabel
        this.headerStyle = {
            font: { 
                bold: true, 
                size: 12,
                name: "Arial",
                color: { rgb: "FFFFFF" }
            },
            alignment: { 
                horizontal: "center", 
                vertical: "center",
                wrapText: true
            },
            border: this.thickBorders,
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: { rgb: "4472C4" } // Blue
            }
        };

        // Style untuk cell data standar
        this.cellStyle = {
            font: {
                size: 11,
                name: "Arial"
            },
            border: this.allBorders,
            alignment: { 
                vertical: "center",
                wrapText: true
            }
        };
        
        // Style untuk jenis pelanggaran
        this.violationStyles = {
            ringan: {
                font: { bold: true, size: 11, name: "Arial", color: { rgb: "000000" } },
                fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: "FFEB9C" } },
                border: this.allBorders,
                alignment: { horizontal: "center", vertical: "center" }
            },
            sedang: {
                font: { bold: true, size: 11, name: "Arial", color: { rgb: "000000" } },
                fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: "BDD7EE" } },
                border: this.allBorders,
                alignment: { horizontal: "center", vertical: "center" }
            },
            berat: {
                font: { bold: true, size: 11, name: "Arial", color: { rgb: "FFFFFF" } },
                fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: "FF0000" } },
                border: this.allBorders,
                alignment: { horizontal: "center", vertical: "center" }
            }
        };
    }

    async exportLaporan(selectedDate = '') {
        try {
            // Determine export type for title and filename
            let exportType = '';
            let filenameSuffix = '';
            
            if (!selectedDate) {
                // All dates
                exportType = 'SEMUA TANGGAL';
                filenameSuffix = 'Semua-Tanggal';
            } else {
                const dateObj = new Date(selectedDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                dateObj.setHours(0, 0, 0, 0);
                
                if (dateObj.getTime() === today.getTime()) {
                    // Today's date
                    exportType = 'HARI INI';
                    filenameSuffix = 'Hari-Ini';
                } else {
                    // Selected specific date
                    const formattedDate = dateObj.toLocaleDateString('id-ID');
                    exportType = formattedDate;
                    filenameSuffix = formattedDate.replace(/\//g, '-');
                }
            }

            // Fetch data based on selected date
            const url = selectedDate 
                ? `/api/laporan?date=${encodeURIComponent(selectedDate)}` 
                : '/api/laporan';
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (!data || data.length === 0) {
                this.showError('Tidak ada data untuk di-export');
                return;
            }

            // Create workbook
            const wb = XLSX.utils.book_new();
            
            // Update title with export type
            const title = `LAPORAN PELANGGARAN SISWA - ${exportType}`;

            // Create worksheet with updated title
            const ws = XLSX.utils.aoa_to_sheet([
                [title],
                [],
                ['No', 'Tanggal', 'Nama Siswa', 'Kelas', 'Jurusan', 'Jenis Pelanggaran', 'Judul Pelanggaran', 'Keterangan']
            ]);
            
            // Format data
            const formattedData = data.map((item, index) => [
                index + 1,
                new Date(item.tanggal).toLocaleDateString('id-ID'),
                item.nama?.toUpperCase() || '',
                item.kelas || '',
                item.jurusan || '',
                {
                    v: item.jenis_pelanggaran?.toUpperCase() || '',
                    t: 's',
                    s: this.violationStyles[item.jenis_pelanggaran] || this.cellStyle
                },
                item.title || '',
                item.description || ''
            ]);
            
            // Add data to worksheet
            XLSX.utils.sheet_add_aoa(ws, formattedData, { origin: 'A4' });
            
            // Set column widths
            ws['!cols'] = [
                { wch: 5 },   // No
                { wch: 15 },  // Tanggal
                { wch: 30 },  // Nama Siswa
                { wch: 10 },  // Kelas
                { wch: 15 },  // Jurusan
                { wch: 18 },  // Jenis Pelanggaran
                { wch: 35 },  // Judul Pelanggaran
                { wch: 40 }   // Keterangan
            ];
            
            // Set row heights
            ws['!rows'] = [
                { hpt: 30 },  // Title row
                { hpt: 15 },  // Spacing row
                { hpt: 25 },  // Header row
            ];
            
            // Define merged cells for title
            ws['!merges'] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }
            ];
            
            // Style title - Full border around it
            ws.A1 = {
                v: title,
                t: 's',
                s: this.titleStyle
            };

            // Apply style to header and cells
            const range = XLSX.utils.decode_range(ws['!ref']);
            
            // Style all headers
            for (let C = range.s.c; C <= range.e.c; C++) {
                const headerCell = XLSX.utils.encode_cell({ r: 2, c: C });
                if (ws[headerCell]) {
                    ws[headerCell].s = this.headerStyle;
                }
            }
            
            // Style all data cells with clear borders
            for (let R = 3; R <= range.e.r; R++) {
                for (let C = range.s.c; C <= range.e.c; C++) {
                    const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
                    
                    if (ws[cellRef]) {
                        // Skip styling column 5 (Jenis Pelanggaran) as it has custom styling
                        if (C === 5 && ws[cellRef].s) continue;
                        
                        // Apply cell style with borders and zebra striping
                        ws[cellRef].s = {
                            ...this.cellStyle,
                            alignment: {
                                vertical: "center",
                                horizontal: C <= 1 || C === 3 ? "center" : "left", 
                                wrapText: true
                            },
                            fill: {
                                type: 'pattern',
                                patternType: 'solid',
                                fgColor: { rgb: R % 2 === 0 ? "FFFFFF" : "F2F2F2" } // Zebra striping
                            },
                            border: this.allBorders  // Border jelas untuk setiap cell
                        };
                    }
                }
            }

            // Add to workbook
            XLSX.utils.book_append_sheet(wb, ws, "Data Pelanggaran");
            
            // Export dengan nama file yang sesuai
            XLSX.writeFile(wb, `Laporan-Pelanggaran-${filenameSuffix}.xlsx`);
            this.showSuccess('Data berhasil di-export ke Excel');

        } catch (error) {
            console.error('Export error:', error);
            this.showError('Gagal mengexport data');
        }
    }

    formatJenisPelanggaran(jenis) {
        if (!jenis) return '';
        try {
            return jenis.toUpperCase();
        } catch (error) {
            console.error('Error formatting jenis pelanggaran:', error);
            return '';
        }
    }

    showError(message) {
        console.error(message);
        const errorDiv = document.getElementById('errorAlert');
        const errorMessage = document.getElementById('errorMessage');
        if (errorDiv && errorMessage) {
            errorMessage.textContent = message;
            errorDiv.classList.remove('d-none');
            setTimeout(() => {
                errorDiv.classList.add('d-none');
            }, 5000);
        }
    }

    showSuccess(message) {
        const successDiv = document.getElementById('successAlert');
        const successMessage = document.getElementById('successMessage');
        if (successDiv && successMessage) {
            successMessage.textContent = message;
            successDiv.classList.remove('d-none');
            setTimeout(() => successDiv.classList.add('d-none'), 3000);
        }
    }
}

const excelExport = new ExcelExport();