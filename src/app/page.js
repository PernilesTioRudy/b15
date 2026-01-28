'use client';

import styles from './home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { KITS } from '../data/kits';
import { Package, Truck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Page() {
    const { user, openLogin } = useAuth();
    // WhatsApp Configuration
    const PHONE_NUMBER = "5492994520532";

    // Main Consultation Button
    const whatsappMessage = "Hola! Estoy empezando el Programa B15 y necesito información sobre la Asesoría";
    const whatsappLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

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
                        // Kit Config
                        const kitOrderMessage = `Hola! Me interesa la ${kit.title} para mi proceso de Reset Box`;
                        const kitWhatsappLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(kitOrderMessage)}`;

                        return (
                            <div key={kit.id} className={styles.kitCard}>
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
                                    <a
                                        href={kitWhatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.kitButtonPrimary}
                                    >
                                        <Package size={18} />
                                        Pedir Kit
                                    </a>

                                    {!user && (
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