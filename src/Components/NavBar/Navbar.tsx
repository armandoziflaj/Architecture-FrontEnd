import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Navbar.module.css';
import { useTranslation } from "react-i18next";

export const Navbar = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className={styles.nav}>
            <div className={styles.navWrapper}>
                <a href="/" className={styles.logo}>
                    Sulozeqi<span className={styles.dot}>.</span>
                </a>

                <div className={styles.desktopLinks}>
                    <a href={"/#works"} className={styles.linkItem}>
                        {t('nav.works')}
                    </a>
                    <a href={"/#profile"} className={styles.linkItem}>
                        {t('nav.profile')}
                    </a>
                </div>

                <div className={styles.desktopActions}>
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>

                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
                    <div className={`${styles.bar} ${isMenuOpen ? styles.bar1Open : ''}`} />
                    <div className={`${styles.bar} ${isMenuOpen ? styles.bar2Open : ''}`} />
                    <div className={`${styles.bar} ${isMenuOpen ? styles.bar3Open : ''}`} />
                </button>
            </div>

            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <a href={"/#works"} className={styles.mobileLinkItem} onClick={toggleMenu}>
                        {t('nav.works')}
                    </a>
                    <a href={"/#profile"} className={styles.mobileLinkItem} onClick={toggleMenu}>
                        {t('nav.profile')}
                    </a>
                    <div className={styles.mobileActions}>
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </nav>
    );
};
