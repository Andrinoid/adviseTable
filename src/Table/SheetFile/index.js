import React, { useCallback } from 'react';
import { utils, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';


const SheetFileDownload = () => {
    const downloadExcelFile = useCallback(() => {
        const data = [
            ['Name', 'Age', 'City'],
            ['John', 30, 'New York'],
            ['Bob', 35, 'Chicago'],
            ['Jane', 25, 'San Francisco']
        ];

        const workbook = utils.book_new();
        const sheet = utils.aoa_to_sheet(data);
        utils.book_append_sheet(workbook, sheet, 'Sheet1');
        writeFile(workbook, 'example.xlsx', { bookType: 'xlsx', type: 'buffer' });

        // var blob = new Blob([workbook], { type: "text/plain;charset=utf-8" });
        // console.log('blob', blob);
        // // saveAs(binary, 'example.xlsx');
        // saveAs(blob, 'example.xlsx');

        // const fileURL = URL.createObjectURL(new Blob([workbook], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        // const link = document.createElement('a');
        // link.href = fileURL;
        // link.setAttribute('download', 'example.xlsx');
        // document.body.appendChild(link);
        // link.click();
        // console.log('link', link);
    }, []);





    return (
        <button onClick={downloadExcelFile}>
            Download Excel File
        </button>
    );
};

export default SheetFileDownload;