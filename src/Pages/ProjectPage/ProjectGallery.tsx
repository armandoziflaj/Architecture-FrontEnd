import { useState } from 'react';
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

type BentoSpan = 'wide' | 'square' | 'tall';

/* Cell shape is picked from the photo's own aspect ratio so cover-cropping
   stays mild — a wide cell for landscape shots, a tall cell for portrait/
   story shots, square for everything in between — rather than forcing
   every photo into a single uniform tile. */
const getBentoSpan = (ratio: number): BentoSpan => {
    if (ratio >= 1.6) return 'wide';
    if (ratio <= 0.85) return 'tall';
    return 'square';
};

export const ProjectGallery = ({ photos, altTextPrefix }: ProjectGalleryProps) => {
    const reduceMotion = useReducedMotion();
    const itemVariants = withReducedMotion(fadeUp, !!reduceMotion);
    const [spans, setSpans] = useState<Map<string, BentoSpan>>(new Map());

    const getFullImageUrl = (rawUrl: string) => {
        if (rawUrl.startsWith('http')) {
            return rawUrl;
        }
        return `${API_BASE_URL}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;
    };

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).src = '/placeholder.jpg';
    };

    const handleImageLoad = (key: string) => (e: SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        setSpans((prev) => new Map(prev).set(key, getBentoSpan(naturalWidth / naturalHeight)));
    };

    return (
        <motion.section
            className={styles.gallery}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
        >
            {photos.map((photo, index) => {
                const key = String(photo.id);
                const span = spans.get(key) ?? 'square';

                return (
                    <motion.img
                        key={key}
                        src={getFullImageUrl(photo.imageUrl)}
                        alt={photo.altText ?? `${altTextPrefix} photo ${index + 1}`}
                        className={`${styles['gallery-image']} ${styles[`bento-${span}`]}`}
                        variants={itemVariants}
                        onLoad={handleImageLoad(key)}
                        onError={handleImageError}
                    />
                );
            })}
        </motion.section>
    );
};
