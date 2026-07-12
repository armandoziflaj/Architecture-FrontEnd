import React from 'react';
import styles from './MainLayout.module.css';
import {Navbar} from "../../Components/NavBar/Navbar.tsx";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className="container">
                    <Navbar />
                </div>
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