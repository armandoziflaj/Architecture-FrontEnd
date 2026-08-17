import React, { useState } from 'react';
import { GenericForm, type FormField } from '../../../Components/GenericForm/GenericForm';
import { ImageManager } from '../../../Components/Admin/ImageManager/ImageManager';
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader.tsx";
import { LanguageTabs } from "./LanguageTabs.tsx";
import { useProjectFormState } from './useProjectFormState.ts';
import { useCreateProject, useUpdateProject, useProjectById } from "../../../hooks/useProjects.ts";
import styles from './ProjectManagement.module.css';
import { useTranslation } from 'react-i18next';
import {useSearchParams} from "react-router";

export const ProjectManagement = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const editIdParam = searchParams.get('edit');
    const activeProjectId = editIdParam ? Number(editIdParam) : null;
    const isEditMode = Boolean(activeProjectId);

    const { data: existingProject, isLoading: isLoadingProject } = useProjectById(activeProjectId?.toString() ?? '');
    const { mutateAsync: createProject, isPending: isCreating } = useCreateProject();
    const { mutateAsync: updateProject, isPending: isUpdating } = useUpdateProject();
    const isPending = isCreating || isUpdating;

    const [isFormOpen, setIsFormOpen] = useState(true);
    const [activeLang, setActiveLang] = useState<'el' | 'en'>('en');

    const { state, setters, resetForm } = useProjectFormState(isEditMode, existingProject);

    const handleCloseOrOpenCreate = () => {
        resetForm();
        setSearchParams({});
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData();

        try {
            if (isEditMode && activeProjectId) {
                const newPhotoFiles: File[] = [];

                const photosOrder = state.images.map((img, index) => {
                    if (img.file) {
                        const newPhotoIndex = newPhotoFiles.length;
                        newPhotoFiles.push(img.file);
                        return {
                            newPhotoIndex: newPhotoIndex, // Placeholder to link to the file
                            displayOrder: index + 1
                        };
                    } else {
                        return {
                            id: Number(img.id),
                            displayOrder: index + 1
                        };
                    }
                });

                const projectData = {
                    id: activeProjectId,
                    location: state.location,
                    completionYear: state.year,
                    size: state.size,
                    isFeatured: false,
                    translations: [
                        { languageCode: 'en', title: state.titleEn, description: state.descEn },
                        { languageCode: 'el', title: state.titleEl, description: state.descEl }
                    ],
                    photos: photosOrder
                };

                formData.append('projectData', JSON.stringify(projectData));

                newPhotoFiles.forEach(file => {
                    formData.append('newPhotos', file);
                });

                await updateProject(formData);

            } else {
                const newPhotos: File[] = state.images
                    .map(img => img.file)
                    .filter((file): file is File => !!file);

                const photosOrder = state.images.map((_, index) => ({
                    displayOrder: index + 1
                }));

                const projectData = {
                    location: state.location,
                    completionYear: state.year,
                    size: state.size,
                    isFeatured: false,
                    translations: [
                        { languageCode: 'en', title: state.titleEn, description: state.descEn },
                        { languageCode: 'el', title: state.titleEl, description: state.descEl }
                    ],
                    photos: photosOrder
                };

                formData.append('projectData', JSON.stringify(projectData));

                newPhotos.forEach(file => {
                    formData.append('newPhotos', file);
                });

                await createProject(formData);
                resetForm();
            }
        } catch (error) {
            console.error("Mutation failed", error);
        }
    };
    const currentTitle = activeLang === 'en' ? state.titleEn : state.titleEl;
    const currentTitleSetter = activeLang === 'en' ? setters.setTitleEn : setters.setTitleEl;
    const currentDesc = activeLang === 'en' ? state.descEn : state.descEl;
    const currentDescSetter = activeLang === 'en' ? setters.setDescEn : setters.setDescEl;

    const projectFields: FormField[] = [
        {
            id: 'title',
            label: t('admin.projectManagement.titleLabel', { lang: activeLang.toUpperCase() }),
            type: 'text',
            placeholder: t('admin.projectManagement.titlePlaceholder'),
            value: currentTitle,
            onChange: currentTitleSetter,
            required: true
        },
        { id: 'location', label: t('admin.projectManagement.locationLabel'), type: 'text', placeholder: t('admin.projectManagement.locationPlaceholder'), value: state.location, onChange: setters.setLocation, required: true },
        { id: 'year', label: t('admin.projectManagement.yearLabel'), type: 'text', placeholder: t('admin.projectManagement.yearPlaceholder'), value: state.year, onChange: setters.setYear, required: true },
        { id: 'size', label: t('admin.projectManagement.sizeLabel'), type: 'text', placeholder: t('admin.projectManagement.sizePlaceholder'), value: state.size, onChange: setters.setSize, required: true },
        {
            id: 'description',
            label: t('admin.projectManagement.descriptionLabel', { lang: activeLang.toUpperCase() }),
            type: 'textarea',
            placeholder: t('admin.projectManagement.descriptionPlaceholder'),
            value: currentDesc,
            onChange: currentDescSetter,
            required: true,
            rows: 5
        }
    ];

    if (isLoadingProject) {
        return <div className={styles['loading-text']}>{t('admin.projectManagement.loading')}</div>;
    }

    return (
        <div className={styles['management-container']}>
            <SectionHeader
                title={isEditMode ? t('admin.projectManagement.editTitle', { id: activeProjectId }) : t('admin.projectManagement.createTitle')}
                actionLabel={isFormOpen ? t('admin.projectManagement.backButton') : t('admin.projectManagement.newButton')}
                onActionClick={isFormOpen ? () => { setIsFormOpen(false); } : handleCloseOrOpenCreate}
            />

            {isFormOpen && (
                <div className={styles['form-container']}>
                    <LanguageTabs activeLang={activeLang} onSelectLanguage={setActiveLang} />

                    <form onSubmit={handleFormSubmit} className={styles['structural-form']}>
                        <GenericForm fields={projectFields} submitLabel="" onSubmit={() => {}} />

                        <div className={styles['media-framework']}>
                            <h4 className={styles['framework-title']}>{t('admin.projectManagement.mediaTitle')}</h4>
                            <ImageManager images={state.images} onImagesChange={setters.setImages} />
                        </div>

                        <button type="submit" className={styles['submit-structure-btn']} disabled={isPending}>
                            {isPending
                                ? (isEditMode ? t('admin.projectManagement.committing') : t('admin.projectManagement.publishing'))
                                : (isEditMode ? t('admin.projectManagement.commitButton') : t('admin.projectManagement.publishButton'))
                            }
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};