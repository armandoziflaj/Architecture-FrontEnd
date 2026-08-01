import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GenericForm, type FormField } from '../../../Components/GenericForm/GenericForm';
import { ImageManager } from '../../../Components/Admin/ImageManager/ImageManager';
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader.tsx";
import { LanguageTabs } from "./LanguageTabs.tsx";
import { useProjectFormState } from './useProjectFormState.ts';
import {type ExistingPhotoDto, mapToCreateProjectPayload, type UpdateProjectRequest} from '../../../Types/ProjectAdmin';
import { useCreateProject, useUpdateProject, useProjectById } from "../../../hooks/useProjects.ts";
import styles from './ProjectManagement.module.css';

export const ProjectManagement = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const editIdParam = searchParams.get('edit');
    const activeProjectId = editIdParam ? Number(editIdParam) : null;
    const isEditMode = Boolean(activeProjectId);

    const { data: existingProject, isLoading: isLoadingProject } = useProjectById(activeProjectId?.toString() || '');
    const { mutate: createProject, isPending: isCreating } = useCreateProject();
    const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
    const isPending = isCreating || isUpdating;

    const [isFormOpen, setIsFormOpen] = useState(true);
    const [activeLang, setActiveLang] = useState<'el' | 'en'>('en');

    const { state, setters, resetForm } = useProjectFormState(isEditMode, existingProject);

    const handleCloseOrOpenCreate = () => {
        resetForm();
        setSearchParams({});
        setIsFormOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode && activeProjectId) {
            const retainedPhotos: ExistingPhotoDto[] = [];
            const newPhotos: File[] = [];
            const newPhotoDisplayOrders: number[] = [];

            state.images.forEach((img, index) => {
                const displayOrder = index + 1;
                if (img.file) {
                    newPhotos.push(img.file);
                    newPhotoDisplayOrders.push(displayOrder);
                } else {
                    retainedPhotos.push({
                        id: Number(img.id),
                        imageUrl: img.url,
                        displayOrder
                    });
                }
            });

            const updatePayload: UpdateProjectRequest = {
                id: activeProjectId,
                location: state.location,
                completionYear: state.year,
                size: state.size,
                isFeatured: false,
                translations: [
                    { languageCode: 'en', title: state.titleEn, description: state.descEn },
                    { languageCode: 'el', title: state.titleEl, description: state.descEl }
                ],
                retainedPhotos,
                newPhotos,
                newPhotoDisplayOrders
            };

            updateProject(updatePayload, {
                onSuccess: () => {
                    alert("Structure updated successfully!");
                    handleCloseOrOpenCreate();
                }
            });
        } else {
            const payload = mapToCreateProjectPayload(
                state.location,
                state.year,
                state.size,
                false,
                {
                    el: { title: state.titleEl, description: state.descEl },
                    en: { title: state.titleEn, description: state.descEn }
                },
                state.images
            );

            createProject(payload, {
                onSuccess: () => {
                    alert("Project created successfully!");
                    resetForm();
                }
            });
        }
    };

    const currentTitle = activeLang === 'en' ? state.titleEn : state.titleEl;
    const currentTitleSetter = activeLang === 'en' ? setters.setTitleEn : setters.setTitleEl;
    const currentDesc = activeLang === 'en' ? state.descEn : state.descEl;
    const currentDescSetter = activeLang === 'en' ? setters.setDescEn : setters.setDescEl;

    const projectFields: FormField[] = [
        {
            id: 'title',
            label: `Project Title (${activeLang.toUpperCase()})`,
            type: 'text',
            placeholder: 'Enter structure name',
            value: currentTitle,
            onChange: currentTitleSetter,
            required: true
        },
        { id: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Voula, Athens', value: state.location, onChange: setters.setLocation, required: true },
        { id: 'year', label: 'Year', type: 'text', placeholder: 'e.g., 2026', value: state.year, onChange: setters.setYear, required: true },
        { id: 'size', label: 'Size', type: 'text', placeholder: 'e.g., 240m²', value: state.size, onChange: setters.setSize, required: true },
        {
            id: 'description',
            label: `Architectural Narrative (${activeLang.toUpperCase()})`,
            type: 'textarea',
            placeholder: 'Describe the concept...',
            value: currentDesc,
            onChange: currentDescSetter,
            required: true,
            rows: 5
        }
    ];

    if (isLoadingProject) {
        return <div className={styles.loadingText}>Loading structure framework...</div>;
    }

    return (
        <div className={styles.managementContainer}>
            <SectionHeader
                title={isEditMode ? `Edit Framework #${activeProjectId}` : "Project Management"}
                actionLabel={isFormOpen ? "← Back to Frameworks" : "+ New Framework ↗"}
                onActionClick={isFormOpen ? () => setIsFormOpen(false) : handleCloseOrOpenCreate}
            />

            {isFormOpen && (
                <div className={styles.formContainer}>
                    <LanguageTabs activeLang={activeLang} onSelectLanguage={setActiveLang} />

                    <form onSubmit={handleFormSubmit} className={styles.structuralForm}>
                        <GenericForm fields={projectFields} submitLabel="" onSubmit={() => {}} />

                        <div className={styles.mediaFramework}>
                            <h4 className={styles.frameworkTitle}>03 — Sequenced Visual Assets</h4>
                            <ImageManager images={state.images} onImagesChange={setters.setImages} />
                        </div>

                        <button type="submit" className={styles.submitStructureBtn} disabled={isPending}>
                            {isPending
                                ? (isEditMode ? 'Committing Changes...' : 'Publishing...')
                                : (isEditMode ? 'Commit Changes ↗' : 'Commit & Publish Package ↗')
                            }
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};