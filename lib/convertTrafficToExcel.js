const ExcelJS = require('exceljs');


module.exports = ConvertWebsitesDataToExcel;

function ConvertWebsitesDataToExcel(websitesData){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Websites Traffic Data');

    worksheet.addRow(['Website Domain', 'Total Visits (Last Month)', 'Page Per Visit', 'Avg Visit Duration']);


    // Resize all columns
    autoSizeColumns(worksheet);

    websitesData.forEach(website => {
        let data = website.data;
        worksheet.addRow([
            website.websiteDomain,
            data.totalVisits,
            data.pagePerVisit,
            data.avgVisitDuration
        ]);
    });

    // Style all cells
    borderCurrentCells(worksheet);
    
    workbook.xlsx.writeFile('Websites-Traffic.xlsx')
    .then(function () {
        console.log('Excel file created successfully!');
    })
    .catch(function (error) {
        console.error('Error:', error);
    });

}

function autoSizeColumns(worksheet){
    worksheet.columns.forEach(function (column, i) {
        let maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
            let columnLength = cell.value ? cell.value.toString().length + 2 : 10;
            if (columnLength > maxLength ) {
                maxLength = columnLength;
            }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
    });
}

function borderCurrentCells(worksheet){
    // Set borders for all cells in the worksheet
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        // Set border style, color, and thickness
        cell.border = {
            top: { style: 'thin', color: { argb: '00000000' } },
            left: { style: 'thin', color: { argb: '00000000' } },
            bottom: { style: 'thin', color: { argb: '00000000' } },
            right: { style: 'thin', color: { argb: '00000000' } },
        };
        });
    });  
}