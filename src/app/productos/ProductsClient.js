'use client';

import React, { useState } from 'react';
import styles from './products.module.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Lock, ShoppingCart, Plus, Minus } from 'lucide-react';

export default function ProductsClient({ categorizedProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { user, openLogin } = useAuth();
    const { addToCart, updateQuantity, cartItems } = useCart();

    // Helper to check cart status
    const getCartItem = (code) => cartItems.find(item => item.id === code);

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
                        Ya podés agregar productos a tu pedido.
                    </div>
                ) : (
                    <div style={{ marginBottom: '1.5rem', color: '#3E2723', opacity: 0.8, fontSize: '0.9rem' }}>
                        Inicia sesión para ver los precios y armar tu pedido.
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
                                        <th style={{ textAlign: 'right' }}>Precio / Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.items.map((product, pIndex) => {
                                        const cartItem = getCartItem(product.code);
                                        // Parse price for cart logic (remove $ and points)
                                        const priceValue = product.price
                                            ? parseFloat(product.price.replace('$ ', '').replace(/\./g, ''))
                                            : 0;

                                        return (
                                            <tr key={pIndex} className={styles.row}>
                                                <td className={styles.codeCell}>
                                                    {product.code}
                                                </td>
                                                <td>
                                                    {product.description}
                                                </td>
                                                <td style={{ textAlign: 'right', minWidth: '160px' }}>
                                                    {user ? (
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                                            <span style={{ fontWeight: 'bold', color: '#B59573', fontSize: '1.05rem' }}>
                                                                {product.price || '-'}
                                                            </span>

                                                            {priceValue > 0 && (
                                                                cartItem ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F9F7F2', borderRadius: '4px', border: '1px solid #B59573' }}>
                                                                        <button
                                                                            onClick={() => updateQuantity(product.code, -1)}
                                                                            style={{ padding: '4px 8px', borderRight: '1px solid #ddd', background: 'none', cursor: 'pointer', color: '#3E2723' }}
                                                                        ><Minus size={14} /></button>
                                                                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{cartItem.quantity}</span>
                                                                        <button
                                                                            onClick={() => updateQuantity(product.code, 1)}
                                                                            style={{ padding: '4px 8px', borderLeft: '1px solid #ddd', background: 'none', cursor: 'pointer', color: '#3E2723' }}
                                                                        ><Plus size={14} /></button>
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => addToCart({
                                                                            id: product.code,
                                                                            name: product.description,
                                                                            price: priceValue,
                                                                            type: 'product'
                                                                        })}
                                                                        style={{
                                                                            backgroundColor: '#B59573',
                                                                            color: 'white',
                                                                            border: 'none',
                                                                            borderRadius: '4px',
                                                                            padding: '0.4rem 0.8rem',
                                                                            cursor: 'pointer',
                                                                            fontSize: '0.85rem',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '4px'
                                                                        }}
                                                                    >
                                                                        <ShoppingCart size={14} />
                                                                        Agregar
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
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
                                        );
                                    })}
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
