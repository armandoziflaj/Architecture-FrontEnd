import React from 'react';
import { LanguageTabs } from './LanguageTabs';
import { GenericForm, type FormField } from '../../../Components/GenericForm/GenericForm';
import { ImageManager } from '../../../Components/Admin/ImageManager/ImageManager';
import { type ProjectImage } from '../../../Types/ProjectAdmin';
import styles from './ProjectManagement.module.css';
import type {TFunction} from "i18next";

interface LanguageProps {
    activeLang: 'el' | 'en';
    onSelectLanguage: (lang: 'el' | 'en') => void;
}

interface MediaProps {
    images: ProjectImage[];
    onImagesChange: (images: ProjectImage[]) => void;
}

interface VisibilityProps {
    isFeatured: boolean;
    onFeaturedChange: (isFeatured: boolean) => void;
}

interface ProjectFormProps {
    t: TFunction;
    language: LanguageProps;
    media: MediaProps;
    visibility: VisibilityProps;
    handleFormSubmit: (e: React.SubmitEvent) => void;
    projectFields: FormField[];
    isPending: boolean;
    isEditMode: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
    t,
    language,
    media,
    visibility,
    handleFormSubmit,
    projectFields,
    isPending,
    isEditMode,
}) => {
    const getSubmitButtonText = () => {
        if (isPending) {
            return isEditMode ? t('admin.projectManagement.committing') : t('admin.projectManagement.publishing');
        }
        return isEditMode ? t('admin.projectManagement.commitButton') : t('admin.projectManagement.publishButton');
    };

    return (
        <div className={styles['form-container']}>
            <LanguageTabs activeLang={language.activeLang} onSelectLanguage={language.onSelectLanguage} />
            <form onSubmit={handleFormSubmit} className={styles['structural-form']}>
                <GenericForm fields={projectFields} submitLabel="" onSubmit={(e) => e.preventDefault()} />

                <div className={styles['media-framework']}>
                    <h4 className={styles['framework-title']}>{t('admin.projectManagement.mediaTitle')}</h4>
                    <ImageManager images={media.images} onImagesChange={media.onImagesChange} />
                </div>

                <div className={styles['visibility-framework']}>
                    <h4 className={styles['framework-title']}>{t('admin.projectManagement.visibilityTitle')}</h4>
                    <label className={styles['featured-toggle']}>
                        <input
                            type="checkbox"
                            checked={visibility.isFeatured}
                            onChange={(e) => { visibility.onFeaturedChange(e.target.checked); }}
                        />
                        <span className={styles['featured-checkbox']} aria-hidden="true">
                            <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 8.5l3.5 3.5 7-8" />
                            </svg>
                        </span>
                        <span className={styles['featured-copy']}>
                            <span className={styles['featured-label']}>{t('admin.projectManagement.featuredLabel')}</span>
                            <span className={styles['featured-hint']}>{t('admin.projectManagement.featuredHint')}</span>
                        </span>
                    </label>
                </div>

                <button type="submit" className={styles['submit-structure-btn']} disabled={isPending}>
                    {getSubmitButtonText()}
                </button>
            </form>
        </div>
    );
};
