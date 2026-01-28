import productsData from '../../data/products.json';
import ProductsClient from './ProductsClient';

export default function ProductsPage() {
    // Parse logic
    const categorizedProducts = [];
    let currentCategory = null;

    productsData.forEach(row => {
        const col1 = row["__EMPTY"]; // Often Code or "Rubro: ..." or "Fecha..."
        const col2 = row["Lista de precios Distribuidora Cabane"]; // Description or "Linea: ..."
        // const col3 = row["__EMPTY_1"]; // Alicuota
        // const col4 = row["__EMPTY_2"]; // Price no IVA
        // const col5 = row["__EMPTY_3"]; // Price with IVA

        if (!col1 && !col2) return; // Empty row

        const col1Str = String(col1 || "").trim();
        const col2Str = String(col2 || "").trim();

        // Check for Category (Rubro)
        // Example: "-- RUBRO: ALIMENTOS --"
        if (col1Str.startsWith("-- RUBRO:")) {
            const categoryName = col1Str.replace("-- RUBRO:", "").replace("--", "").trim();
            currentCategory = {
                name: categoryName,
                items: []
            };
            categorizedProducts.push(currentCategory);
            return;
        }

        // Check for "Linea" (Sub-category, treating as just data or separate header? User asked to group by Rubro. Linea seems to be inside Rubro)
        // Example: "-- Línea: 123 LISTO --"
        if (col2Str.startsWith("-- Línea:")) {
            // Optional: We could make sub-headers or just ignore and list items. 
            // For now, let's treat currentCategory as the main container. 
            // Maybe we can append Linea to category name or just assume items belong to current Rubro.
            // Let's stick to simple Rubro grouping first as requested.
            return;
        }

        // Ignore Headers
        if (col1Str === "Código" || col1Str.startsWith("Fecha:") || col2Str.startsWith("Cliente:")) {
            return;
        }

        // Identify Product
        // Products usually have a Code (col1) and Description (col2)
        // Also ensuring it's not a category line just in case (though covered above)
        if (currentCategory && col1Str && col2Str && !col1Str.includes("--") && !col2Str.includes("--")) {
            // Simple validation: Code usually looks like a number or alphanumeric string
            // And Description is text.

            // Price parsing with 45% margin
            const rawPrice = row["__EMPTY_3"] || row["__EMPTY_2"] || 0;
            const priceWithMargin = typeof rawPrice === 'number' ? rawPrice * 1.45 : 0;

            const formattedPrice = priceWithMargin > 0
                ? `$ ${priceWithMargin.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                : null;

            currentCategory.items.push({
                code: col1Str,
                description: col2Str,
                price: formattedPrice
            });
        }
    });

    // Filter out empty categories
    const validCategories = categorizedProducts.filter(c => c.items.length > 0);

    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <ProductsClient categorizedProducts={validCategories} />
        </main>
    );
}
