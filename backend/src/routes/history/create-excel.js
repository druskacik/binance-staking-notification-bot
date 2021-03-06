const ExcelJS = require('exceljs');

const createExcel = (assetName, duration, dbData, stakingType = 'locked') => {
    const workBook = new ExcelJS.Workbook();
    const sheet = workBook.addWorksheet(`${assetName} ${duration} ${stakingType}`);

    sheet.columns = [
        { header: 'timestamp (UTC)', key: 'timestamp', width: 24, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } },
        { header: 'became_sold_out', key: 'became_sold_out', width: 16 },
    ];

    const rows = dbData.map(row => ([
        new Date(row.created_at),
        row.became_sold_out,
    ]));

    sheet.addRows(rows);

    return workBook;
};

const createExcelDefi = (assetName, dbData) => {
    const workBook = new ExcelJS.Workbook();
    const sheet = workBook.addWorksheet(`${assetName} DeFi`);

    sheet.columns = [
        { header: 'timestamp (UTC)', key: 'timestamp', width: 32, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } },
        { header: 'left_available', key: 'left_available', width: 16 },
        { header: 'sold_out', key: 'sold_out', width: 16 },
    ];

    const rows = dbData.map(row => ([
        new Date(row.created_at),
        row.left_available,
        row.sold_out,
    ]));

    sheet.addRows(rows);

    return workBook;
};

module.exports = {
    createExcel,
    createExcelDefi,
};
