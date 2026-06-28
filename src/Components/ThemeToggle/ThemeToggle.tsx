import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <button className={styles.toggleBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? 'dark' : 'light'}
        </button>
    );
};