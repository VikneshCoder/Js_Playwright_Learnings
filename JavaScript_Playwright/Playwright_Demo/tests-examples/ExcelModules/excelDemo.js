const ExcelJs = require('exceljs');

async function writeExcelFile(path, updateValue, columnobject) {

    let workbook = new ExcelJs.Workbook();  // Creating a new workbook

    await workbook.xlsx.readFile(path);  // Reading the Excel file
    let worksheet = workbook.getWorksheet('Fruit'); // Getting the worksheet named 'Fruit'

    const data = await readExcelFile('Orange', worksheet); // Calling the function to read the file and find the cell with 'Apple'

    const cell = worksheet.getCell(data.row, data.col + columnobject.colNo); // Getting the cell to be updated
    cell.value = updateValue; // Updating the cell value
    await workbook.xlsx.writeFile(path); // Writing the changes to the file
}

async function readExcelFile(fruitName, worksheet) {
    let dataChange = {row: -1 , col: -1};   // Creating an object to store the row and column number
    worksheet.eachRow((row, rowNumber)=>{    // Iterating through each row
    row.eachCell((cell, colNumber)=>{
        if (cell.value === fruitName ) {
            dataChange.row = rowNumber;
            dataChange.col = colNumber;
        }   
    })
})
    return dataChange; // Returning the object with the row and column number
}


writeExcelFile('excelDemo.xlsx', '400', {rowNo: 0, colNo: 1});


