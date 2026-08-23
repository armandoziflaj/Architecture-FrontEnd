import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import styles from './ProjectPage.module.css';
import { fadeUp, viewportOnce, withReducedMotion } from '../../animations/variants';

interface ProjectContentProps {
    summary: string;
}

export const ProjectContent = ({ summary }: ProjectContentProps) => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const variants = withReducedMotion(fadeUp, !!reduceMotion);

    return (
        <motion.div
            className={styles['content-wrapper']}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={variants}
        >
            <div className={styles.decoration}></div>
            <section className={styles.content}>
                <h3>{t('projectPage.overview')}</h3>
                <p>{summary}</p>
            </section>
        </motion.div>
    );
};
