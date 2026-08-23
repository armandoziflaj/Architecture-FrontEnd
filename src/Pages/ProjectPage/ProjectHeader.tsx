import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import styles from './ProjectPage.module.css';
import type { ProjectDetailedResponse as Project } from '../../Types/ProjectResponse';
import { fadeUp, staggerContainer, withReducedMotion } from '../../animations/variants';

interface ProjectHeaderProps {
    project: Project;
    activeTitle: string;
}

export const ProjectHeader = ({ project, activeTitle }: ProjectHeaderProps) => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const itemVariants = withReducedMotion(fadeUp, !!reduceMotion);

    return (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1)}>
            <motion.div variants={itemVariants}>
                <Link to="/" className={styles['back-link']}>
                    <span>←</span>
                    <span>{t('projectPage.back')}</span>
                </Link>
            </motion.div>

            <motion.header className={styles.header} variants={itemVariants}>
                <h1>{activeTitle}</h1>
                <div className={styles.meta}>
                    <span>{project.location}</span>
                    <span>{project.completionYear}</span>
                    <span>{project.size} m²</span>
                </div>
            </motion.header>
        </motion.div>
    );
};
