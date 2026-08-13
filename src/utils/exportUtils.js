import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

export const exportToExcel = (data, servicesData, packageName, appName) => {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }

    try {
        const exportData = data.map((item, index) => ({
            '#': index + 1,
            'Shop Name': item.shop_name || '-',
            'Email': item.email || '-',
            'Contact No.': item.contact || item.phone_number || item.phone_no || '-',
            'Country': item.country || item.country_name || '-',
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        
        setColumnWidths(worksheet);
        
        applyWorksheetStyling(worksheet, exportData.length);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `${appName.replace(/\s+/g, '_')}_Export_${timestamp}.xlsx`;

        XLSX.writeFile(workbook, filename);

    } catch (error) {
        console.error('Export error:', error);
        alert('Error exporting data. Please try again.');
    }
};

const setColumnWidths = (worksheet) => {
    const colWidths = [
        { wch: 6 },
        { wch: 20 },
        { wch: 25 },
        { wch: 15 },
        { wch: 15 },
    ];

    worksheet['!cols'] = colWidths;
};

const applyWorksheetStyling = (worksheet, dataLength) => {
    const headerStyle = {
        fill: { fgColor: { rgb: 'FF1E293B' } },
        font: { bold: true, color: { rgb: 'FFFFFFFF' }, size: 12 },
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
        border: {
            top: { style: 'thin', color: { rgb: 'FF94A3B8' } },
            bottom: { style: 'thin', color: { rgb: 'FF94A3B8' } },
            left: { style: 'thin', color: { rgb: 'FF94A3B8' } },
            right: { style: 'thin', color: { rgb: 'FF94A3B8' } },
        },
    };

    const cellStyle = {
        alignment: { horizontal: 'left', vertical: 'center' },
        border: {
            top: { style: 'thin', color: { rgb: 'FFE2E8F0' } },
            bottom: { style: 'thin', color: { rgb: 'FFE2E8F0' } },
            left: { style: 'thin', color: { rgb: 'FFE2E8F0' } },
            right: { style: 'thin', color: { rgb: 'FFE2E8F0' } },
        },
    };

    for (let col in worksheet) {
        if (col.startsWith('!')) continue;

        const cellRef = worksheet[col];
        if (cellRef.v !== undefined) {
            const row = parseInt(col.replace(/[A-Z]/g, ''));

            if (row === 1) {
                cellRef.s = headerStyle;
            } else if (row > 1 && row <= dataLength + 1) {
                cellRef.s = { ...cellStyle };
                if (row % 2 === 0) {
                    cellRef.s.fill = { fgColor: { rgb: 'FFF8FAFC' } };
                }
            }
        }
    }
};

export const exportToCSV = (data, servicesData, packageName, appName) => {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }

    try {
        const exportData = data.map((item, index) => ({
            '#': index + 1,
            'Shop Name': item.shop_name || '-',
            'Email': item.email || '-',
            'Contact No.': item.contact || item.phone_number || item.phone_no || '-',
            'Country': item.country || item.country_name || '-',
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `${appName.replace(/\s+/g, '_')}_Export_${timestamp}.csv`;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
        link.download = filename;
        link.click();
    } catch (error) {
        console.error('CSV export error:', error);
        alert('Error exporting CSV. Please try again.');
    }
};

export const exportToPDF = (data, servicesData, packageName, appName) => {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }

    try {
        const doc = new jsPDF('p', 'mm', 'a4');
        const timestamp = new Date().toISOString().slice(0, 10);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 8;
        const rowHeight = 8;
        const headerHeight = 10;

        const colWidths = [12, 50, 50, 35, 30];

        const drawHeader = (startY) => {
            doc.setFillColor(30, 41, 59);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');

            const headers = ['#', 'Shop Name', 'Email', 'Contact No.', 'Country'];
            let xPos = margin;

            headers.forEach((header, idx) => {
                doc.rect(xPos, startY, colWidths[idx], headerHeight, 'F');
                const align = idx === 0 ? 'center' : 'left';
                doc.text(header, idx === 0 ? xPos + colWidths[idx] / 2 : xPos + 1.5, startY + 6.5, { 
                    maxWidth: colWidths[idx] - 3,
                    align: align
                });
                xPos += colWidths[idx];
            });

            return startY + headerHeight;
        };

        doc.setFontSize(16);
        doc.setTextColor(30, 41, 59);
        doc.setFont(undefined, 'bold');
        doc.text(`${appName} - Export`, pageWidth / 2, 8, { align: 'center' });

        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.setFont(undefined, 'normal');
        doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, 14, { align: 'center' });

        let currentY = 20;
        let pageNum = 1;

        currentY = drawHeader(currentY);

        doc.setTextColor(50, 50, 50);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);

        data.forEach((item, index) => {
            if (currentY + rowHeight > pageHeight - 12) {
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

                doc.addPage();
                pageNum++;
                currentY = margin;

                currentY = drawHeader(currentY);
                doc.setTextColor(50, 50, 50);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(8);
            }

            if (index % 2 === 0) {
                doc.setFillColor(248, 250, 252);
                let xPos = margin;
                colWidths.forEach(width => {
                    doc.rect(xPos, currentY, width, rowHeight, 'F');
                    xPos += width;
                });
            }

            let xPos = margin;
            doc.setDrawColor(200, 200, 200);
            colWidths.forEach(width => {
                doc.rect(xPos, currentY, width, rowHeight);
                xPos += width;
            });

            const rowData = [
                String(index + 1),
                (item.shop_name || '-').substring(0, 20),
                (item.email || '-').substring(0, 26),
                (item.contact || item.phone_number || item.phone_no || '-').substring(0, 18),
                (item.country || item.country_name || '-').substring(0, 12),
            ];

            xPos = margin;
            doc.setTextColor(50, 50, 50);
            rowData.forEach((cell, idx) => {
                const cellAlign = idx === 0 ? 'center' : 'left';
                const xOffset = idx === 0 ? colWidths[idx] / 2 : 1.5;
                doc.text(String(cell), xPos + xOffset, currentY + 5.5, {
                    maxWidth: colWidths[idx] - 3,
                    align: cellAlign
                });
                xPos += colWidths[idx];
            });

            currentY += rowHeight;
        });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

        const filename = `${appName.replace(/\s+/g, '_')}_Export_${timestamp}.pdf`;
        doc.save(filename);

    } catch (error) {
        console.error('PDF export error:', error);
        alert('Error exporting PDF. Please try again.');
    }
};