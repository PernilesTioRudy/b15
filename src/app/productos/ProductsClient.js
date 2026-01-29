'use client';

import React, { useState } from 'react';
import styles from './products.module.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Lock, ShoppingCart, Plus, Minus, Search, Leaf } from 'lucide-react';

export default function ProductsClient({ categorizedProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { user, openLogin } = useAuth();
    const { addToCart, updateQuantity, cartItems } = useCart();

    const getCartItem = (code) => cartItems.find(item => item.id === code);

    // Filter products
    const filteredCategories = categorizedProducts.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    })).filter(category => category.items.length > 0);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Nuestros Productos</h1>

                {user ? (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#F0EAE4', borderRadius: '8px', color: '#3E2723', border: '1px solid #B59573' }}>
                        <strong>¡Hola {user.name}!</strong><br />
                        Explorá nuestras categorías y armá tu pedido.
                    </div>
                ) : (
                    <div style={{ marginBottom: '1.5rem', color: '#3E2723', opacity: 0.8, fontSize: '0.9rem' }}>
                        Inicia sesión para ver precios y comprar.
                    </div>
                )}

                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        placeholder="Buscar producto, marca o rubro..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div>
                {filteredCategories.map((category, index) => {
                    const isNutrilite = category.name.includes("Nutrilite");
                    const isKits = category.name.includes("Kits");

                    return (
                        <div key={index} className={styles.categoryGroup}>
                            <div className={styles.categoryHeader}>
                                <h2 className={styles.categoryTitle}>
                                    {category.name}
                                    {isNutrilite && (
                                        <span style={{
                                            marginLeft: '10px',
                                            fontSize: '0.8rem',
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '20px',
                                            verticalAlign: 'middle',
                                            fontWeight: 'normal',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <Leaf size={12} /> Calidad Orgánica Certificada
                                        </span>
                                    )}
                                </h2>
                            </div>

                            <div className={styles.gridContainer}>
                                {category.items.map((product, pIndex) => {
                                    const cartItem = getCartItem(product.code);

                                    return (
                                        <div key={pIndex} className={styles.card}>
                                            {/* Image Placeholder */}
                                            <div className={styles.imagePlaceholder}>
                                                <span style={{ opacity: 0.3, fontSize: '2rem' }}>🌿</span>
                                            </div>

                                            <div className={styles.cardContent}>
                                                <h3 className={styles.cardTitle}>{product.description}</h3>

                                                {/* Specialized content for Nutrilite/Kits */}
                                                {(isNutrilite || isKits) && product.details && (
                                                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                                                        {typeof product.details === 'string' ? product.details : product.details.profile}
                                                    </p>
                                                )}

                                                <div className={styles.cardFooter}>
                                                    {user ? (
                                                        <div className={styles.priceAction}>
                                                            <div className={styles.priceTag}>
                                                                {product.price || '-'}
                                                            </div>

                                                            {cartItem ? (
                                                                <div className={styles.qtyControl}>
                                                                    <button onClick={() => updateQuantity(product.code, -1)}><Minus size={16} /></button>
                                                                    <span>{cartItem.quantity}</span>
                                                                    <button onClick={() => updateQuantity(product.code, 1)}><Plus size={16} /></button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => addToCart({
                                                                        id: product.code,
                                                                        name: product.description,
                                                                        price: product.rawPrice,
                                                                        type: isKits ? 'kit' : 'product'
                                                                    })}
                                                                    className={styles.addButton}
                                                                >
                                                                    <ShoppingCart size={16} /> Agregar
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <button className={styles.lockButton} onClick={openLogin}>
                                                            <Lock size={14} /> Ver Precio
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {filteredCategories.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No se encontraron productos.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
