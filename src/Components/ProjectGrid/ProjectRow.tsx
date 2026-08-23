import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from './ProjectRow.module.css';
import type { ProjectResponse } from "../../Types/ProjectResponse.ts";
import { fadeUp, viewportOnce, withReducedMotion } from '../../animations/variants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProjectRowProps {
    project: ProjectResponse;
    index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const rowVariants = withReducedMotion(fadeUp, !!reduceMotion);
    const coverPhoto = project.photos.at(0) ?? null;
    const isReversed = index % 2 === 1;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={rowVariants}
        >
            <Link
                to={`/project/${project.id}`}
                className={`${styles.row} ${isReversed ? styles.reversed : ''}`}
            >
                <div className={styles['image-col']}>
                    <div
                        className={styles['image-frame']}
                        style={{
                            backgroundImage: coverPhoto ? `url(${API_BASE_URL}${coverPhoto.imageUrl})` : 'none',
                        }}
                        title={coverPhoto?.altText ?? project.title}
                    >
                        <span className={styles['view-label']}>
                            {t('works.viewProject')}
                            <span className={styles.arrow} aria-hidden="true">&#8594;</span>
                        </span>
                    </div>
                </div>

                <div className={styles['content-col']}>
                    <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.summary}>{project.summary}</p>
                    <div className={styles.meta}>
                        <span>{project.location}</span>
                        {project.completionYear && <span>{project.completionYear}</span>}
                        <span>{project.size} m²</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
