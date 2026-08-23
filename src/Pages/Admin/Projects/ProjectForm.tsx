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

interface ProjectFormProps {
    t: TFunction;
    language: LanguageProps;
    media: MediaProps;
    handleFormSubmit: (e: React.SubmitEvent) => void;
    projectFields: FormField[];
    isPending: boolean;
    isEditMode: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
    t,
    language,
    media,
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
                <button type="submit" className={styles['submit-structure-btn']} disabled={isPending}>
                    {getSubmitButtonText()}
                </button>
            </form>
        </div>
    );
};