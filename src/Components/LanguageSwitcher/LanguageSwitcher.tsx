import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <div className={styles.container}>
            <button
                className={`${styles.btn} ${i18n.language === 'en' ? styles.active : ''}`}
                onClick={() => i18n.changeLanguage('en')}
            >
                EN
            </button>
            <span className={styles.divider}>|</span>
            <button
                className={`${styles.btn} ${i18n.language === 'el' ? styles.active : ''}`}
                onClick={() => i18n.changeLanguage('el')}
            >
                EL
            </button>
        </div>
    );
};