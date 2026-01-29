import productsData from '../../data/products.json';
import nutriliteData from '../../data/nutrilite_products.json';
import { KITS } from '../../data/kits';
import ProductsClient from './ProductsClient';

export default function ProductsPage() {
    // 1. Define Categories structure
    const CATEGORIES = {
        KITS: { name: "Kits de Reseteo B15", items: [] },
        NUTRILITE: { name: "Suplementos Nutrilite (Amway)", items: [] },
        DEPORTES: { name: "Suplementos Deportivos y Dietarios", items: [] },
        FRUTOS: { name: "Frutos Secos y Mixes", items: [] },
        ALMACEN: { name: "Almacén Natural", items: [] },
        HARINAS: { name: "Harinas y Repostería Saludable", items: [] },
        HIERBAS: { name: "Hierbas e Infusiones", items: [] },
        OTROS: { name: "Otros Productos", items: [] } // Fallback
    };

    // 2. Populate Kits
    CATEGORIES.KITS.items = KITS.map(kit => ({
        code: kit.id,
        description: `Kit ${kit.title}`,
        price: `$ ${kit.price?.toLocaleString('es-AR')}`,
        rawPrice: kit.price,
        type: 'kit',
        details: kit
    }));

    // 3. Populate Nutrilite
    CATEGORIES.NUTRILITE.items = nutriliteData.map(prod => ({
        code: prod.id,
        description: prod.name,
        details: prod.description, // Store description to show
        price: `$ ${prod.price.toLocaleString('es-AR')}`,
        rawPrice: prod.price,
        type: 'nutrilite',
        image: prod.image // CRITICAL: Pass the image path
    }));

    // 4. Parse & Map Cabane Items
    let currentRubro = "";

    productsData.forEach(row => {
        const col1 = row["__EMPTY"];
        const col2 = row["Lista de precios Distribuidora Cabane"];

        if (!col1 && !col2) return;

        const col1Str = String(col1 || "").trim();
        const col2Str = String(col2 || "").trim();

        // Detect Rubro
        if (col1Str.startsWith("-- RUBRO:")) {
            currentRubro = col1Str.replace("-- RUBRO:", "").replace("--", "").trim().toUpperCase();
            return;
        }

        // Detect Product
        // Rules: Code in col1 (alphanumeric), Description in col2, not a header
        if (col1Str && col2Str && !col1Str.includes("--") && !col2Str.includes("--") &&
            col1Str !== "Código" && !col1Str.startsWith("Fecha:")) {

            // Calculate Price
            const rawPrice = row["__EMPTY_3"] || row["__EMPTY_2"] || 0;
            const priceWithMargin = typeof rawPrice === 'number' ? rawPrice * 1.45 : 0;

            if (priceWithMargin <= 0) return; // Skip invalid prices

            const formattedPrice = `$ ${priceWithMargin.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

            const item = {
                code: col1Str,
                description: col2Str,
                price: formattedPrice,
                rawPrice: priceWithMargin,
                type: 'product'
            };

            // Map to Category
            let targetCat = CATEGORIES.OTROS;

            if (["SUPLEMENTOS", "DEPORTES", "VITAMINAS", "PROT"].some(k => currentRubro.includes(k))) targetCat = CATEGORIES.DEPORTES;
            else if (["FRUTOS SECOS", "FRUTAS", "SEMILLAS"].some(k => currentRubro.includes(k))) targetCat = CATEGORIES.FRUTOS;
            else if (["HARINAS", "REPOSTERIA", "PREMEZCLAS", "GALLETITAS"].some(k => currentRubro.includes(k))) targetCat = CATEGORIES.HARINAS;
            else if (["HIERBAS", "TE", "YERBA", "MATE"].some(k => currentRubro.includes(k))) targetCat = CATEGORIES.HIERBAS;
            else if (["ALIMENTOS", "ACEITES", "CONDIMENTOS", "LEGUMBRES", "CEREALES", "MIEL", "MERMELADAS", "BEBIDAS", "JUGOS", "COSMETICA"].some(k => currentRubro.includes(k))) targetCat = CATEGORIES.ALMACEN;
            else targetCat = CATEGORIES.ALMACEN; // Aggressive fallback to Almacen for general groceries

            targetCat.items.push(item);
        }
    });

    // 5. Final Array in Order
    const finalCategories = [
        CATEGORIES.KITS,
        CATEGORIES.NUTRILITE,
        CATEGORIES.DEPORTES,
        CATEGORIES.FRUTOS,
        CATEGORIES.ALMACEN,
        CATEGORIES.HARINAS,
        CATEGORIES.HIERBAS
    ].filter(c => c.items.length > 0);

    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <ProductsClient categorizedProducts={finalCategories} />
        </main>
    );
}
