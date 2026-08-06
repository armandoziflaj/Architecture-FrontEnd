import React from 'react';
import styles from './MainLayout.module.css';
import { Navbar } from "../../Components/NavBar/Navbar.tsx";
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'var(--bg-color)',
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)',
                    },
                }}
            />
            <header className={styles.header}>
                <Navbar />
            </header>

            <main className={`${styles.main} container`}>
                {children}
            </main>

            <footer className={styles.footer}>
                <div className="container">
                    <p>© {new Date().getFullYear()} Sulozeqi Constructions. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
