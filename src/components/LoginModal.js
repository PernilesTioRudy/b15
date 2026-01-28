'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function LoginModal() {
    const { showLoginModal, closeLogin, login } = useAuth();
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    if (!showLoginModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !whatsapp) {
            alert("Por favor completa ambos campos");
            return;
        }

        login({ name, whatsapp });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(50, 40, 30, 0.7)', // Darker overlay
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(3px)'
        }}>
            <div style={{
                backgroundColor: '#F9F7F2', // Bone/Cream
                padding: '2rem',
                borderRadius: '20px',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                position: 'relative',
                textAlign: 'center',
                border: '1px solid #B59573'
            }}>
                <button
                    onClick={closeLogin}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#3E2723'
                    }}
                >
                    <X size={24} />
                </button>

                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <Image
                        src="/logo_nuevo.png"
                        alt="Reset Box"
                        width={150}
                        height={75}
                        style={{ width: '150px', height: 'auto' }}
                    />
                </div>

                <h2 style={{ color: '#B59573', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Acceso a Clientes
                </h2>
                <p style={{ color: '#3E2723', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.4' }}>
                    Unite a la comunidad de alimentación consciente de Reset Box.
                </p>
                <p style={{ color: '#3E2723', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.4', opacity: 0.8 }}>
                    Ingresá tus datos para ver la lista de precios exclusiva.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #B59573',
                            fontSize: '1rem',
                            outline: 'none',
                            backgroundColor: 'white',
                            color: '#3E2723'
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Tu WhatsApp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #B59573',
                            fontSize: '1rem',
                            outline: 'none',
                            backgroundColor: 'white',
                            color: '#3E2723'
                        }}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#3E2723', opacity: 0.7, textAlign: 'left', margin: '0' }}>
                        * Tus datos son solo para coordinar envíos en Nqn y Cipo.
                    </p>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#B59573', // Soft Brown
                            color: 'white',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginTop: '0.5rem',
                            boxShadow: '0 4px 10px rgba(181, 149, 115, 0.3)'
                        }}
                    >
                        Entrar y Ver Precios
                    </button>
                </form>
            </div>
        </div>
    );
}
