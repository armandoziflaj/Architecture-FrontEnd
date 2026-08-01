import React from 'react';
import type { ProjectImage } from '../../../Types/ProjectAdmin';
import styles from './ImageManager.module.css';

interface ImageManagerProps {
    images: ProjectImage[];
    onImagesChange: (images: ProjectImage[]) => void;
}

export const ImageManager = ({ images, onImagesChange }: ImageManagerProps) => {

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);
        const newImages: ProjectImage[] = filesArray.map((file, index) => ({
            id: `temp-${Date.now()}-${index}`,
            url: URL.createObjectURL(file),
            file: file,
            sortOrder: images.length + index + 1
        }));

        onImagesChange([...images, ...newImages]);
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= images.length) return;

        const updated = [...images];
        // Swap
        const temp = updated[index];
        updated[index] = updated[targetIndex];
        updated[targetIndex] = temp;

        // Update sortOrder values dynamically
        const reindexed = updated.map((img, idx) => ({
            ...img,
            sortOrder: idx + 1
        }));

        onImagesChange(reindexed);
    };

    const removeImage = (id: string) => {
        const filtered = images.filter(img => img.id !== id);
        const reindexed = filtered.map((img, idx) => ({
            ...img,
            sortOrder: idx + 1
        }));
        onImagesChange(reindexed);
    };

    return (
        <div className={styles.container}>
            <label className={styles.uploadBox}>
                <span>+ Upload Architectural Media</span>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className={styles.hiddenInput}
                />
            </label>

            <div className={styles.imagesGrid}>
                {images.map((img, index) => (
                    <div key={img.id} className={styles.imageCard}>
                        <img src={img.url} alt={`Structure visual ${img.sortOrder}`} />

                        {/* Order Badge */}
                        <span className={styles.orderBadge}>#{img.sortOrder}</span>

                        {/* Mobile & Desktop Friendly Controls */}
                        <div className={styles.controlsOverlay}>
                            <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => moveImage(index, 'up')}
                            >
                                ↑
                            </button>
                            <button
                                type="button"
                                disabled={index === images.length - 1}
                                onClick={() => moveImage(index, 'down')}
                            >
                                ↓
                            </button>
                            <button
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => img.id && removeImage(img.id)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};