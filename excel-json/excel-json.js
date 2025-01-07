const fs = require('fs');
const xlsx = require('xlsx');

// Excel dosyasını yükle
const excelFilePath = 'products.xlsx'; // Excel dosyasının yolu
const workbook = xlsx.readFile(excelFilePath);

// İlk sayfayı seç
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Verileri JSON'a çevir
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// JSON dosyasına yaz
const jsonFilePath = 'products.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 4), 'utf-8');

console.log(`JSON dosyası oluşturuldu: ${jsonFilePath}`);
