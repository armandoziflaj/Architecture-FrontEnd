import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import styles from './Hero.module.css';
import { fadeUp, viewportOnce, withReducedMotion } from '../../animations/variants';

export const Hero = () => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const contentVariants = withReducedMotion(fadeUp, !!reduceMotion);

    return (
        <section className={styles['hero-section']}>
            <div className={styles['video-overlay']}></div>
            <video
                className={styles['background-video']}
                autoPlay={!reduceMotion}
                loop={!reduceMotion}
                muted
                playsInline
            >
                <source src="/Acropolis.mp4" type="video/mp4" />
            </video>

            <svg className={styles.arch} viewBox="0 0 200 240" aria-hidden="true">
                <path d="M4 236V96C4 45.7 47.7 4 100 4s96 41.7 96 92v140" fill="none" strokeWidth="1.5" />
            </svg>

            <motion.div
                className={styles['content-wrapper']}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={contentVariants}
            >
                <span className={styles.subtitle}>{t('hero.subtitle')}</span>
                <h1 className={styles.title}>{t('hero.title')}</h1>
                <a href="/#work" className={styles.cta}>
                    {t('hero.cta')}
                    <span className={styles['cta-arrow']}>&#8594;</span>
                </a>
            </motion.div>
        </section>
    );
};
