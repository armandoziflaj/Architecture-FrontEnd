import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Navbar.module.css';
import { useTranslation } from "react-i18next";

export const Navbar = () => {
    const { t } = useTranslation();

    return (
        <nav className={styles.nav}>
            <a href="/" className={styles.logo}>
                Sulozeqi Constructions<span className={styles.dot}>.</span>
            </a>

            <div className={styles.links}>
                <a href={"#works"} className={styles.linkItem}>
                    {t('nav.works')}
                </a>
                <a href={"#profile"} className={styles.linkItem}>
                    {t('nav.profile')}
                </a>
            </div>

            <div className={styles.actions}>
                <LanguageSwitcher />
                <ThemeToggle />
            </div>
        </nav>
    );
};