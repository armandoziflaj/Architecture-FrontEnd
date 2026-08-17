import React from 'react';
import { LanguageTabs } from './LanguageTabs';
import {type FormField, GenericForm} from '../../../Components/GenericForm/GenericForm';
import { ImageManager } from '../../../Components/Admin/ImageManager/ImageManager';
import {type ProjectImage} from '../../../Types/ProjectAdmin';
import styles from './ProjectManagement.module.css';
import type {TFunction} from "i18next";

interface ProjectFormProps {
    t: TFunction;
    activeLang: 'el' | 'en';
    onSelectLanguage: (lang: 'el' | 'en') => void;
    handleFormSubmit: (_e: React.SubmitEvent) => void;
    projectFields: FormField[];
    images: ProjectImage[];
    onImagesChange: (images: ProjectImage[]) => void;
    isPending: boolean;
    isEditMode: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
    t,
    activeLang,
    onSelectLanguage,
    handleFormSubmit,
    projectFields,
    images,
    onImagesChange,
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
            <LanguageTabs activeLang={activeLang} onSelectLanguage={onSelectLanguage} />
            <form onSubmit={handleFormSubmit} className={styles['structural-form']}>
                <GenericForm fields={projectFields} submitLabel="" onSubmit={(e) => e.preventDefault()} />
                <div className={styles['media-framework']}>
                    <h4 className={styles['framework-title']}>{t('admin.projectManagement.mediaTitle')}</h4>
                    <ImageManager images={images} onImagesChange={onImagesChange} />
                </div>
                <button type="submit" className={styles['submit-structure-btn']} disabled={isPending}>
                    {getSubmitButtonText()}
                </button>
            </form>
        </div>
    );
};