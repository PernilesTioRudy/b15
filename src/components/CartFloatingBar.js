'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag } from 'lucide-react';

export default function CartFloatingBar() {
    const { cartItems, totalAmount, openCart } = useCart();
    const { user } = useAuth();

    // Only show if user is logged in AND has items
    if (!user || cartItems.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#F9F7F2',
            borderTop: '1px solid #B59573',
            padding: '1rem',
            zIndex: 40,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '100vw'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Total Estimado</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3E2723' }}>
                    $ {totalAmount.toLocaleString('es-AR')}
                </span>
            </div>

            <button
                onClick={openCart}
                style={{
                    backgroundColor: '#B59573',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    boxShadow: '0 4px 6px rgba(181, 149, 115, 0.3)'
                }}
            >
                <ShoppingBag size={20} />
                Ver Mi Pedido ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </button>
        </div>
    );
}
