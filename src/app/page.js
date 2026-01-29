'use client';

import styles from './home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { KITS } from '../data/kits';
import { Package, Truck, Lock, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Page() {
    const { user, openLogin } = useAuth();
    const { addToCart, updateQuantity, cartItems } = useCart();

    // WhatsApp Configuration
    const PHONE_NUMBER = "5492994520532";

    // Main Consultation Button
    const whatsappMessage = "Hola! Estoy empezando el Programa B15 y necesito información sobre la Asesoría";
    const whatsappLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Helper to check cart status for Kits
    const getCartItem = (id) => cartItems.find(item => item.id === id);

    return (
        <main className={styles.container}>
            {/* Logo */}
            <div className={styles.logo}>
                <Image
                    src="/logo_nuevo.png"
                    alt="Reset Box Logo"
                    width={300}
                    height={150}
                    priority
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>

            <p className={styles.subtitle}>Dietética Especializada - Insumos para tu Bienestar</p>

            <Link href="/productos" className={styles.mainButton}>
                Ver Catálogo de Productos
            </Link>

            <p className={styles.shippingText}>
                Envíos a domicilio en Neuquén y Cipolletti ($10.000).<br />
                Envío <strong>GRATIS</strong> en compras superiores a $200.000.
            </p>

            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
            >
                Asesoría Personalizada con un Health Coach
            </a>

            {/* KITS SECTION */}
            <section className={styles.kitsSection}>
                <h2 className={styles.kitsTitle}>Kits Reset Box</h2>
                <div className={styles.kitsGrid}>
                    {KITS.map((kit) => {
                        const cartItem = getCartItem(kit.id);

                        return (
                            <div key={kit.id} className={styles.kitCard}>
                                {/* Kit Image */}
                                {kit.image && (
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: '1 / 1',
                                        overflow: 'hidden',
                                        borderRadius: '12px 12px 0 0',
                                        backgroundColor: '#F0EAE4'
                                    }}>
                                        <img
                                            src={kit.image}
                                            alt={kit.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                padding: '1rem'
                                            }}
                                        />
                                    </div>
                                )}

                                <h3 className={styles.kitHeader}>{kit.title}</h3>
                                <p className={styles.kitProfile}>{kit.profile}</p>

                                {/* Base List */}
                                <div className={styles.listTitle}>Base Esencial</div>
                                <ul className={styles.kitList}>
                                    {kit.base.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>

                                {/* Specifics List */}
                                {kit.specifics && kit.specifics.length > 0 && (
                                    <>
                                        <div className={styles.listTitle}>Específicos</div>
                                        <ul className={styles.kitList}>
                                            {kit.specifics.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* Supplement */}
                                {kit.supplements && (
                                    <div className={styles.kitSupplement}>
                                        {kit.supplements}
                                    </div>
                                )}

                                {/* Price Display */}
                                <div style={{
                                    textAlign: 'center',
                                    margin: '1rem 0',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: '#B59573' // Soft Brown
                                }}>
                                    {user && kit.price ? (
                                        `$ ${kit.price.toLocaleString('es-AR')}`
                                    ) : null}
                                </div>

                                {/* Actions */}
                                <div className={styles.kitActions}>
                                    {user ? (
                                        cartItem ? (
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '100%', marginBottom: '0.5rem' }}>
                                                <button
                                                    onClick={() => updateQuantity(kit.id, -1)}
                                                    style={{ padding: '0.5rem', backgroundColor: '#F9F7F2', borderRadius: '4px', border: '1px solid #B59573', color: '#3E2723', cursor: 'pointer' }}
                                                ><Minus size={20} /></button>
                                                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{cartItem.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(kit.id, 1)}
                                                    style={{ padding: '0.5rem', backgroundColor: '#F9F7F2', borderRadius: '4px', border: '1px solid #B59573', color: '#3E2723', cursor: 'pointer' }}
                                                ><Plus size={20} /></button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart({
                                                    id: kit.id,
                                                    name: `Kit ${kit.title}`,
                                                    price: kit.price,
                                                    type: 'kit'
                                                })}
                                                className={styles.kitButtonPrimary}
                                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                                            >
                                                <ShoppingCart size={18} />
                                                Agregar al Carrito
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            className={styles.kitButtonSecondary}
                                            onClick={openLogin}
                                        >
                                            <Lock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                            Inicia sesión para ver precio del Kit
                                        </button>
                                    )}

                                    <div className={styles.kitShipping}>
                                        <Truck size={14} />
                                        <span>
                                            {kit.price > 200000
                                                ? <b style={{ color: '#B59573' }}>Envío GRATIS (Nqn/Cipo)</b>
                                                : "Envío a domicilio disponible"
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    )
}