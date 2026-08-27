import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Navbar.module.css';
import { useTranslation } from "react-i18next";

export const Navbar = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };
    return (
        <nav className={styles.nav}>
            <div className={styles['nav-wrapper']}>
                <a href="/" className={styles.logo}>
                    Sulozeqi<span className={styles.dot}>.</span>
                </a>

                <div className={styles['desktop-links']}>
                    <a href={"/#works"}>
                        {t('nav.works')}
                    </a>
                    <a href={"/#profile"}>
                        {t('nav.profile')}
                    </a>
                    <a href={"/#contact"}>
                        {t('nav.contact')}
                    </a>
                </div>

                <div className={styles['desktop-actions']}>
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>

                <button
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className={`${styles.bar} ${isMenuOpen ? styles['bar1-open'] : ''}`} />
                    <div className={`${styles.bar} ${isMenuOpen ? styles['bar2-open'] : ''}`} />
                    <div className={`${styles.bar} ${isMenuOpen ? styles['bar3-open'] : ''}`} />
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={styles['mobile-menu']}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <a href={"/"} className={styles['mobile-link-item']} onClick={toggleMenu}>
                            {t('nav.home')}
                        </a>
                        <a href={"/#works"} className={styles['mobile-link-item']} onClick={toggleMenu}>
                            {t('nav.works')}
                        </a>
                        <a href={"/#profile"} className={styles['mobile-link-item']} onClick={toggleMenu}>
                            {t('nav.profile')}
                        </a>
                        <a href={"/#contact"} className={styles['mobile-link-item']} onClick={toggleMenu}>
                            {t('nav.contact')}
                        </a>
                        <div className={styles['mobile-actions']}>
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
