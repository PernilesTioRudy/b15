export const metadata = {
    title: 'Reset Box - Nutrición y Salud',
    description: 'Tienda de bienestar digestivo en Neuquén y Cipolletti',
}

import { AuthProvider } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import Link from 'next/link'; // Added Link import
import { Inter } from 'next/font/google'; // Added Inter import

const inter = Inter({ subsets: ['latin'] }); // Initialized Inter font

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={inter.className} style={{ backgroundColor: '#F9F7F2', minHeight: '100vh', margin: 0, color: '#3E2723' }}>
                <AuthProvider>
                    <LoginModal />

                    {/* Header / Navbar */}
                    <header style={{
                        backgroundColor: '#B59573',
                        padding: '1rem',
                        textAlign: 'center',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>
                                RESET BOX
                            </Link>
                        </nav>
                    </header>

                    {children}

                    <footer style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: '#3E2723',
                        opacity: 0.8,
                        fontSize: '0.9rem',
                        borderTop: '1px solid #E0E0E0',
                        marginTop: 'auto'
                    }}>
                        <p>© {new Date().getFullYear()} Reset Box - Nutrición y Salud</p>
                    </footer>
                </AuthProvider>
            </body>
        </html>
    );
}