'use client';

import React, { useState } from 'react';
import styles from './products.module.css';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

export default function ProductsClient({ categorizedProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { user, openLogin } = useAuth();

    // Filter products
    const filteredCategories = categorizedProducts.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Nuestros Productos</h1>

                {user ? (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#F0EAE4', borderRadius: '8px', color: '#3E2723', border: '1px solid #B59573' }}>
                        <strong>¡Hola {user.name}!</strong><br />
                        Ya podés ver todos los precios exclusivos de Reset Box.
                    </div>
                ) : (
                    <div style={{ marginBottom: '1.5rem', color: '#3E2723', opacity: 0.8, fontSize: '0.9rem' }}>
                        Inicia sesión para ver los precios mayoristas.
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Buscar por nombre o código..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                {filteredCategories.map((category, index) => (
                    <div key={index} className={styles.categoryGroup}>
                        <div className={styles.categoryHeader}>
                            <h2 className={styles.categoryTitle}>
                                {category.name}
                            </h2>
                        </div>

                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descripción</th>
                                        <th style={{ textAlign: 'right' }}>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.items.map((product, pIndex) => (
                                        <tr key={pIndex} className={styles.row}>
                                            <td className={styles.codeCell}>
                                                {product.code}
                                            </td>
                                            <td>
                                                {product.description}
                                            </td>
                                            <td style={{ textAlign: 'right', minWidth: '120px' }}>
                                                {user ? (
                                                    <span style={{ fontWeight: 'bold', color: '#B59573', fontSize: '1.05rem' }}>
                                                        {product.price || '-'}
                                                    </span>
                                                ) : (
                                                    <button
                                                        className={styles.priceButton}
                                                        onClick={openLogin}
                                                        title="Ver precio"
                                                    >
                                                        <Lock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                                                        <span style={{ verticalAlign: 'middle' }}>Ver Precio</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {filteredCategories.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center', color: '#3E2723', opacity: 0.8, fontSize: '0.9rem', padding: '1rem', borderTop: '1px solid #E0E0E0' }}>
                <p>📦 Envíos a domicilio en Neuquén y Cipolletti ($10.000)</p>
                <p style={{ fontWeight: 'bold', color: '#B59573' }}>⚡ Envío GRATIS en compras superiores a $200.000</p>
            </div>
        </div>
    );
}
