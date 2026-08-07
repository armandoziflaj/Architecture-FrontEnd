import { useTranslation } from "react-i18next";
import styles from './Hero.module.css';

export const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className={styles.heroSection}>
            <span className={styles.subtitle}>{t('hero.subtitle')}</span>
            <h1 className={styles.title}>{t('hero.title')}</h1>
        </section>
    );
};
