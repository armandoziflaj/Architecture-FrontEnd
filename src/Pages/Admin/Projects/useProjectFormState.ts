import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateProject, useUpdateProject } from '../../../hooks/useProjects';
import type { ProjectImage } from '../../../Types/ProjectAdmin';
import type { ProjectDetailedResponse } from '../../../Types/ProjectResponse';
import type { FormField } from '../../../Components/GenericForm/GenericForm';

export const useProjectForm = (
    isEditMode: boolean,
    activeProjectId: number | null,
    existingProject?: ProjectDetailedResponse | null
) => {
    const { t } = useTranslation();
    const [hydratedId, setHydratedId] = useState<number | null>(null);
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [size, setSize] = useState('');
    const [images, setImages] = useState<ProjectImage[]>([]);
    const [titleEl, setTitleEl] = useState('');
    const [descEl, setDescEl] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [descEn, setDescEn] = useState('');
    const [activeLang, setActiveLang] = useState<'el' | 'en'>('en');

    const { mutateAsync: createProject, isPending: isCreating } = useCreateProject();
    const { mutateAsync: updateProject, isPending: isUpdating } = useUpdateProject();
    const isPending = isCreating || isUpdating;

    const resetForm = () => {
        setLocation('');
        setYear('');
        setSize('');
        setImages([]);
        setTitleEl('');
        setDescEl('');
        setTitleEn('');
        setDescEn('');
        setHydratedId(null);
    };

    const currentProjectId = existingProject?.id ?? null;

    if (isEditMode && existingProject && hydratedId !== currentProjectId) {
        setHydratedId(currentProjectId);
        setLocation(existingProject.location || '');
        setYear(existingProject.completionYear ?? '');
        setSize(existingProject.size || '');

        const elTrans = existingProject.translations.find(t => t.languageCode.toLowerCase() === 'el');
        const enTrans = existingProject.translations.find(t => t.languageCode.toLowerCase() === 'en');

        setTitleEl((elTrans?.title ?? existingProject.title) || '');
        setDescEl((elTrans?.summary ?? existingProject.summary) || '');
        setTitleEn((enTrans?.title ?? existingProject.title) || '');
        setDescEn((enTrans?.summary ?? existingProject.summary) || '');

        const mappedImages: ProjectImage[] = existingProject.photos.map(photo => ({
            id: String(photo.id),
            url: photo.imageUrl.startsWith('http') ? photo.imageUrl : `${import.meta.env.VITE_API_BASE_URL}${photo.imageUrl.startsWith('/') ? photo.imageUrl : `/${photo.imageUrl}`}`,
            sortOrder: photo.displayOrder ?? 0
        }));
        setImages(mappedImages);
    }

    const handleFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData();
        try {
            if (isEditMode && activeProjectId) {
                const newPhotoFiles: File[] = [];
                const photosOrder = images.map((img, index) => {
                    if (img.file) {
                        const newPhotoIndex = newPhotoFiles.length;
                        newPhotoFiles.push(img.file);
                        return { newPhotoIndex, displayOrder: index + 1 };
                    }
                    return { id: Number(img.id), displayOrder: index + 1 };
                });
                const projectData = {
                    id: activeProjectId,
                    location,
                    completionYear: year,
                    size,
                    isFeatured: false,
                    translations: [
                        { languageCode: 'en', title: titleEn, description: descEn },
                        { languageCode: 'el', title: titleEl, description: descEl }
                    ],
                    photos: photosOrder
                };
                formData.append('projectData', JSON.stringify(projectData));
                newPhotoFiles.forEach(file => { formData.append('newPhotos', file); });
                await updateProject(formData);
            } else {
                const newPhotos: File[] = images.map(img => img.file).filter((file): file is File => !!file);
                const photosOrder = images.map((_, index) => ({ displayOrder: index + 1 }));
                const projectData = {
                    location,
                    completionYear: year,
                    size,
                    isFeatured: false,
                    translations: [
                        { languageCode: 'en', title: titleEn, description: descEn },
                        { languageCode: 'el', title: titleEl, description: descEl }
                    ],
                    photos: photosOrder
                };
                formData.append('projectData', JSON.stringify(projectData));
                newPhotos.forEach(file => { formData.append('newPhotos', file); });
                await createProject(formData);
                resetForm();
            }
        } catch (error) {
            console.error("Mutation failed", error);
        }
    };

    const currentTitle = activeLang === 'en' ? titleEn : titleEl;
    const currentTitleSetter = activeLang === 'en' ? setTitleEn : setTitleEl;
    const currentDesc = activeLang === 'en' ? descEn : descEl;
    const currentDescSetter = activeLang === 'en' ? setDescEn : setDescEl;

    const projectFields: FormField[] = [
        { id: 'title', label: t('admin.projectManagement.titleLabel', { lang: activeLang.toUpperCase() }), type: 'text', placeholder: t('admin.projectManagement.titlePlaceholder'), value: currentTitle, onChange: currentTitleSetter, required: true },
        { id: 'location', label: t('admin.projectManagement.locationLabel'), type: 'text', placeholder: t('admin.projectManagement.locationPlaceholder'), value: location, onChange: setLocation, required: true },
        { id: 'year', label: t('admin.projectManagement.yearLabel'), type: 'text', placeholder: t('admin.projectManagement.yearPlaceholder'), value: year, onChange: setYear, required: true },
        { id: 'size', label: t('admin.projectManagement.sizeLabel'), type: 'text', placeholder: t('admin.projectManagement.sizePlaceholder'), value: size, onChange: setSize, required: true },
        { id: 'description', label: t('admin.projectManagement.descriptionLabel', { lang: activeLang.toUpperCase() }), type: 'textarea', placeholder: t('admin.projectManagement.descriptionPlaceholder'), value: currentDesc, onChange: currentDescSetter, required: true, rows: 5 }
    ];

    return {
        t,
        isPending,
        activeLang,
        setActiveLang,
        images,
        setImages,
        projectFields,
        handleFormSubmit,
        resetForm
    };
};