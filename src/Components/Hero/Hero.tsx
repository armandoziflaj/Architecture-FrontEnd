import { useTranslation } from "react-i18next";
import styles from './Hero.module.css';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

export const Hero = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInViewAnimation({ threshold: 0.3 });

    return (
        <section ref={ref} className={styles.heroSection} data-inview={inView}>
            <div className={styles.videoOverlay}></div>
            <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
                <source src="/Acropolis.mp4" type="video/mp4" />
            </video>
            <div className={styles.contentWrapper}>
                <span className={styles.subtitle}>{t('hero.subtitle')}</span>
                <h1 className={styles.title}>{t('hero.title')}</h1>
                {/*<a href="#works" className={styles.ctaButton}>*/}
                {/*    {t('hero.cta')}*/}
                {/*</a>*/}
            </div>
        </section>
    );
};