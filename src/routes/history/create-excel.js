const ExcelJS = require('exceljs');

const createExcelLocked = (assetName, duration, dbData) => {
    const workBook = new ExcelJS.Workbook();
    const sheet = workBook.addWorksheet(`${assetName} ${duration} locked`);

    sheet.columns = [
        { header: 'timestamp (UTC)', key: 'timestamp', width: 32, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } },
        { header: 'became_sold_out', key: 'became_sold_out', width: 16 },
    ];

    // 2*60*1000 is a UTC correction ... server time is UTC + 2 hours
    const rows = dbData.map((row) => ([
        new Date(row['created_at'] - 2*60*1000),
        row['became_sold_out'],
    ]));

    sheet.addRows(rows);

    return workBook;

}

const createExcelDefi = (assetName, dbData) => {
    const workBook = new ExcelJS.Workbook();
    const sheet = workBook.addWorksheet(`${assetName} DeFi`);

    sheet.columns = [
        { header: 'timestamp (UTC)', key: 'timestamp', width: 32, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } },
        { header: 'left_available', key: 'left_available', width: 16 },
        { header: 'sold_out', key: 'sold_out', width: 16 },
    ];

    // 2*60*1000 is a UTC correction ... server time is UTC + 2 hours
    const rows = dbData.map((row) => ([
        new Date(row['created_at'] - 2*60*1000),
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