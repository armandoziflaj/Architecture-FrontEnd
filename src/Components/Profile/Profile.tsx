import styles from './Profile.module.css';
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce, withReducedMotion } from '../../animations/variants';

export const Profile = () => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const itemVariants = withReducedMotion(fadeUp, !!reduceMotion);

    const expertise = t('profile.expertiseList', { returnObjects: true });
    const recognition = t('profile.recognitionList', { returnObjects: true });

    return (
        <section className={styles.section} id="profile">
            <motion.div
                className={styles['manifesto-block']}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={itemVariants}
            >
                <span className={styles.subtitle}>{t('profile.subtitle')}</span>
                <h2 className={styles['manifesto-text']}>
                    {t('profile.manifesto')}
                </h2>
            </motion.div>

            <motion.div
                className={styles['details-grid']}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer(0.15)}
            >
                <motion.div className={styles.column} variants={itemVariants}>
                    <h3 className={styles['column-title']}>{t('profile.titles.expertise')}</h3>
                    <ul className={styles.list}>
                        {Array.isArray(expertise) && expertise.map((item, index) => (
                            <li key={index} className={styles['list-item']}>{item}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div className={styles.column} variants={itemVariants}>
                    <h3 className={styles['column-title']}>{t('profile.titles.recognition')}</h3>
                    <ul className={styles.list}>
                        {Array.isArray(recognition) && recognition.map((item, index) => (
                            <li key={index} className={styles['list-item']}>{item}</li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </section>
    );
};
