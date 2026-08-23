import type { SyntheticEvent } from 'react';
import { motion, useReducedMotion } from "framer-motion";
import { type PhotosResponse } from '../../Types/ProjectResponse';
import styles from './ProjectPage.module.css';
import { fadeUp, staggerContainer, viewportOnce, withReducedMotion } from '../../animations/variants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProjectGalleryProps {
    photos: PhotosResponse[];
    altTextPrefix: string;
}

export const ProjectGallery = ({ photos, altTextPrefix }: ProjectGalleryProps) => {
    const reduceMotion = useReducedMotion();
    const itemVariants = withReducedMotion(fadeUp, !!reduceMotion);

    const getFullImageUrl = (rawUrl: string) => {
        if (rawUrl.startsWith('http')) {
            return rawUrl;
        }
        return `${API_BASE_URL}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;
    };

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).src = '/placeholder.jpg';
    };

    return (
        <motion.section
            className={styles.gallery}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
        >
            {photos.map((photo, index) => (
                <motion.img
                    key={photo.id || index}
                    src={getFullImageUrl(photo.imageUrl)}
                    alt={photo.altText ?? `${altTextPrefix} photo ${index + 1}`}
                    className={styles['gallery-image']}
                    variants={itemVariants}
                    onError={handleImageError}
                />
            ))}
        </motion.section>
    );
};
