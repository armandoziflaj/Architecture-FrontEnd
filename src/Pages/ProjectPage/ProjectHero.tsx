import { useState } from 'react';
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import styles from './ProjectPage.module.css';
import type { ProjectDetailedResponse as Project, PhotosResponse } from '../../Types/ProjectResponse';
import { fadeUp, staggerContainer, withReducedMotion } from '../../animations/variants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProjectHeroProps {
    project: Project;
    activeTitle: string;
    coverPhoto?: PhotosResponse;
}

const getFullImageUrl = (rawUrl: string) => {
    if (rawUrl.startsWith('http')) return rawUrl;
    return `${API_BASE_URL}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;
};

export const ProjectHero = ({ project, activeTitle, coverPhoto }: ProjectHeroProps) => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const itemVariants = withReducedMotion(fadeUp, !!reduceMotion);
    const [isPortrait, setIsPortrait] = useState(false);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setIsPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth);
    };

    const backLink = (
        <motion.div variants={itemVariants}>
            <Link to="/" className={styles['back-link']}>
                <span>←</span>
                <span>{t('projectPage.back')}</span>
            </Link>
        </motion.div>
    );

    if (!coverPhoto) {
        return (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1)}>
                {backLink}

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
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12)}
        >
            {/* Back link lives in normal page flow, not overlaid on the photo —
                the hero's height now follows the image's own aspect ratio (see
                .hero-image), so a wide/short photo paired with a long, wrapping
                title could otherwise collide with a fixed top-left overlay. */}
            {backLink}

            <div className={`${styles.hero} ${isPortrait ? styles.portrait : ''}`}>
                <motion.img
                    src={getFullImageUrl(coverPhoto.imageUrl)}
                    alt={coverPhoto.altText ?? activeTitle}
                    className={styles['hero-image']}
                    onLoad={handleImageLoad}
                    initial={reduceMotion ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className={styles['hero-scrim']} aria-hidden="true" />

                <motion.div className={styles['hero-content']} variants={itemVariants}>
                    <h1 className={styles['hero-title']}>{activeTitle}</h1>
                    <div className={styles['hero-meta']}>
                        <span>{project.location}</span>
                        <span>{project.completionYear}</span>
                        <span>{project.size} m²</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
