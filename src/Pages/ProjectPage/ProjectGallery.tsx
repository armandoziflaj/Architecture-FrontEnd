import React from 'react';
import {type PhotosResponse} from '../../Types/ProjectResponse';
import styles from './ProjectPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProjectGalleryProps {
    photos: PhotosResponse[];
    altTextPrefix: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ photos, altTextPrefix }) => {
    const getFullImageUrl = (rawUrl: string) => {
        if (rawUrl.startsWith('http')) {
            return rawUrl;
        }
        return `${API_BASE_URL}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (e.target as HTMLImageElement).src = '/placeholder.jpg';
    };

    return (
        <section className={styles.gallery}>
            {photos.map((photo, index) => (
                <img
                    key={photo.id || index}
                    src={getFullImageUrl(photo.imageUrl)}
                    alt={photo.altText ?? `${altTextPrefix} photo ${index + 1}`}
                    className={styles['gallery-image']}
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                    onError={handleImageError}
                />
            ))}
        </section>
    );
};