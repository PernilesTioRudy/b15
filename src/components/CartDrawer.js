'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
        remainingForFreeShipping,
        isFreeShipping
    } = useCart();

    const { user } = useAuth();
    const PHONE_NUMBER = "5492994520532"; // Same config as global

    if (!isCartOpen) return null;

    const handleWhatsAppCheckout = () => {
        if (!user) return; // Should likely be protected by UI consistency, but safety check

        let message = `¡Hola Reset Box! Mi nombre es ${user.name || "Cliente"}. Quiero consultar stock de este pedido:\n`;
        message += "----------------------------------\n";

        cartItems.forEach(item => {
            message += `${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-AR')})\n`;
        });

        message += "----------------------------------\n";
        message += `Total Estimado: $${totalAmount.toLocaleString('es-AR')}\n`;

        if (isFreeShipping) {
            message += "¡Califica para Envío GRATIS!\n";
        }

        message += "¿Tienen stock para enviar a domicilio?";

        const link = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(link, '_blank');
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeCart}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 49,
                }}
            />

            {/* Drawer */}
            <div style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#F9F7F2',
                zIndex: 50,
                boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#B59573',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShoppingBag size={20} /> Mi Pedido
                    </h2>
                    <button onClick={closeCart} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>Tu carrito está vacío.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{
                                    backgroundColor: 'white',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <span style={{ fontWeight: '500', color: '#3E2723', flex: 1 }}>{item.name}</span>
                                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#aaa', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 'bold', color: '#B59573' }}>
                                            $ {item.price.toLocaleString('es-AR')}
                                        </span>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F5F5F5', borderRadius: '4px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                            >-</button>
                                            <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div style={{ padding: '1.5rem', borderTop: '1px solid #E0E0E0', backgroundColor: 'white' }}>
                        {/* Shipping Progress */}
                        <div style={{ marginBottom: '1rem' }}>
                            {isFreeShipping ? (
                                <div style={{
                                    backgroundColor: '#E8F5E9',
                                    color: '#2E7D32',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    border: '1px solid #C8E6C9'
                                }}>
                                    🎉 ¡Envío GRATIS a Neuquén/Cipolletti alcanzado!
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#666' }}>
                                    Faltan <span style={{ fontWeight: 'bold', color: '#B59573' }}>$ {remainingForFreeShipping.toLocaleString('es-AR')}</span> para envío GRATIS
                                    <div style={{ width: '100%', height: '6px', backgroundColor: '#eee', borderRadius: '3px', marginTop: '5px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${Math.min(100, (totalAmount / 200000) * 100)}%`,
                                            height: '100%',
                                            backgroundColor: '#B59573'
                                        }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#3E2723' }}>
                            <span>Total</span>
                            <span>$ {totalAmount.toLocaleString('es-AR')}</span>
                        </div>

                        <button
                            onClick={handleWhatsAppCheckout}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: '#B59573',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                alt="WA"
                                width={20}
                                height={20}
                            />
                            Confirmar Pedido por WhatsApp
                        </button>

                        <button
                            onClick={clearCart}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                backgroundColor: 'transparent',
                                color: '#999',
                                border: 'none',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
