import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Navbar.module.css';

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <a href="/" className={styles.logo}>
                STUDIO<span className={styles.dot}>.</span>
            </a>

            <div className={styles.links}>
                <a href="#works" className={styles.linkItem}>Works</a>
                <a href="#profile" className={styles.linkItem}>Profile</a>
            </div>

            <div className={styles.actions}>
                <ThemeToggle />
            </div>
        </nav>
    );
};