import React from 'react';
import type { ProjectImage } from '../../../Types/ProjectAdmin';
import styles from './ImageManager.module.css';
import { useTranslation } from 'react-i18next';

interface ImageManagerProps {
    images: ProjectImage[];
    onImagesChange: (images: ProjectImage[]) => void;
}

export const ImageManager = ({ images, onImagesChange }: ImageManagerProps) => {
    const { t } = useTranslation();

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
        if (index < 0 || index >= images.length || targetIndex < 0 || targetIndex >= images.length) return;

        const updated = [...images];
        const currentItem = updated.at(index);
        const targetItem = updated.at(targetIndex);

        if (currentItem !== undefined && targetItem !== undefined) {
            updated[index] = targetItem;
            updated[targetIndex] = currentItem;

            const reIndexed = updated.map((img, idx) => ({
                ...img,
                sortOrder: idx + 1
            }));

            onImagesChange(reIndexed);
        }
    };

    const removeImage = (id: string) => {
        const filtered = images.filter(img => img.id !== id);
        const reIndexed = filtered.map((img, idx) => ({
            ...img,
            sortOrder: idx + 1
        }));
        onImagesChange(reIndexed);
    };

    return (
        <div className={styles.container}>
            <label className={styles['upload-box']}>
                <span>{t('admin.imageManager.uploadBox')}</span>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className={styles['hidden-input']}
                />
            </label>

            <div className={styles['images-grid']}>
                {images.map((img, index) => (
                    <div key={img.id} className={styles['image-card']}>
                        <img src={img.url} alt={t('admin.imageManager.altText', { order: img.sortOrder })} />

                        {/* Order Badge */}
                        <span className={styles['order-badge']}>#{img.sortOrder}</span>

                        {/* Mobile & Desktop Friendly Controls */}
                        <div className={styles['controls-overlay']}>
                            <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => { moveImage(index, 'up'); }}
                            >
                                ↑
                            </button>
                            <button
                                type="button"
                                disabled={index === images.length - 1}
                                onClick={() => { moveImage(index, 'down'); }}
                            >
                                ↓
                            </button>
                            <button
                                type="button"
                                className={styles['delete-btn']}
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