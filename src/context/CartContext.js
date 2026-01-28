'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Initial Load
    useEffect(() => {
        setIsClient(true);
        const storedCart = localStorage.getItem('resetBoxCart');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Error parsing cart from localStorage", error);
                localStorage.removeItem('resetBoxCart');
            }
        }
    }, []);

    // Persistence
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('resetBoxCart', JSON.stringify(cartItems));
        }
    }, [cartItems, isClient]);

    const addToCart = (item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true); // Auto open on add
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => prev.filter(i => i.id !== itemId));
    };

    const updateQuantity = (itemId, delta) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.id === itemId) {
                    const newQty = item.quantity + delta;
                    if (newQty <= 0) return null; // Remove if <= 0
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter(Boolean);
        });
    };

    const clearCart = () => setCartItems([]);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    // Calculations
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingGoal = 200000;
    const remainingForFreeShipping = Math.max(0, shippingGoal - totalAmount);
    const isFreeShipping = totalAmount >= shippingGoal;

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            openCart,
            closeCart,
            totalAmount,
            remainingForFreeShipping,
            isFreeShipping
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
