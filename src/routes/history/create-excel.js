const ExcelJS = require('exceljs');

const createExcelLocked = (assetName, duration, dbData) => {
    const workBook = new ExcelJS.Workbook();
    const sheet = workBook.addWorksheet(`${assetName} ${duration} locked`);

    sheet.columns = [
        { header: 'timestamp', key: 'timestamp', width: 32, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } },
        { header: 'became_sold_out', key: 'became_sold_out', width: 16 },
    ];

    const rows = dbData.map((row) => ([
        row['created_at'],
        row['became_sold_out'],
    ]));

    sheet.addRows(rows);

    return workBook;

}

const createExcelDefi = (assetName, dbData) => {
    const workBook = new ExcelJS.Workbook();
    const sheet = workBook.addWorksheet(`${assetName} DeFi`);

    sheet.columns = [
        { header: 'timestamp', key: 'timestamp', width: 32, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } },
        { header: 'left_available', key: 'left_available', width: 16 },
        { header: 'sold_out', key: 'sold_out', width: 16 },
    ];

    const rows = dbData.map((row) => ([
        row['created_at'],
        row['left_available'],
        row['sold_out'],
    ]));

    sheet.addRows(rows);

    return workBook;

}

module.exports = {
    createExcelLocked,
    createExcelDefi,
}