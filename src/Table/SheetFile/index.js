import React, { useCallback } from 'react';
import { utils, writeFile } from 'xlsx-js-style';

const SheetFileDownload = ({ tableMatrix, headerData }) => {
    const downloadExcelFile = useCallback(() => {

        const textHeader = headerData.map((col) => {
            return {
                v: col.title, t: "s", s: {
                    font: {
                        bold: true,
                        color: { rgb: "000000" },
                    },
                    fill: {
                        fgColor: { rgb: "fafafa" }
                    },
                    alignment: {
                        wrapText: true,
                        horizontal: "right",
                        vertical: "center"
                    },
                }
            };

        });

        const textMatrix = tableMatrix.map((row) => {
            return row.map((cell) => {
                return cell.current.innerText;
            });
        });

        textMatrix.unshift(textHeader);

        const workbook = utils.book_new();
        const sheet = utils.aoa_to_sheet(textMatrix);
        console.log(sheet);
        utils.book_append_sheet(workbook, sheet, 'Sheet1');
        writeFile(workbook, 'example.xlsx', { bookType: 'xlsx', type: 'buffer' });


    }, [tableMatrix]);


    return (
        <button onClick={downloadExcelFile}>
            Download Excel File
        </button>
    );
};

export default SheetFileDownload;