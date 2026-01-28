const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, 'Lista_precios_Cabane.xlsx');
const outputPath = path.join(__dirname, 'src', 'data', 'products.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

try {
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Basic normalization (optional: adjust based on actual columns)
    // Assuming columns might be 'Producto', 'Precio', 'Categoria' etc.
    // For now, just dump the raw JSON
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('Conversion successful. Products saved to:', outputPath);
    console.log('Sample item:', data[0]);
} catch (error) {
    console.error('Error converting excel:', error);
}
