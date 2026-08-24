import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { useCreateProject, useUpdateProject } from '../../../hooks/useProjects';
import type { ProjectImage } from '../../../Types/ProjectAdmin';
import type { ProjectDetailedResponse } from '../../../Types/ProjectResponse';
import type { FormField } from '../../../Components/GenericForm/GenericForm';

const mapPhotosToImages = (photos: ProjectDetailedResponse['photos']): ProjectImage[] =>
    photos.map(photo => ({
        id: String(photo.id),
        url: photo.imageUrl.startsWith('http')
            ? photo.imageUrl
            : `${import.meta.env.VITE_API_BASE_URL}${photo.imageUrl.startsWith('/') ? photo.imageUrl : `/${photo.imageUrl}`}`,
        sortOrder: photo.displayOrder ?? 0
    }));

interface TranslatedFields {
    location: string;
    year: string;
    size: string;
    titleEl: string;
    descEl: string;
    titleEn: string;
    descEn: string;
    images: ProjectImage[];
    isFeatured: boolean;
}

const hydrateFromProject = (project: ProjectDetailedResponse): TranslatedFields => {
    const elTrans = project.translations.find(trans => trans.languageCode.toLowerCase() === 'el');
    const enTrans = project.translations.find(trans => trans.languageCode.toLowerCase() === 'en');

    return {
        location: project.location || '',
        year: project.completionYear ?? '',
        size: project.size || '',
        titleEl: (elTrans?.title ?? project.title) || '',
        descEl: (elTrans?.summary ?? project.summary) || '',
        titleEn: (enTrans?.title ?? project.title) || '',
        descEn: (enTrans?.summary ?? project.summary) || '',
        images: mapPhotosToImages(project.photos),
        isFeatured: project.isFeatured ?? false
    };
};

interface ProjectPayloadInput {
    location: string;
    year: string;
    size: string;
    titleEn: string;
    descEn: string;
    titleEl: string;
    descEl: string;
    isFeatured: boolean;
    id?: number;
}

const buildProjectData = ({ location, year, size, titleEn, descEn, titleEl, descEl, isFeatured, id }: ProjectPayloadInput) => ({
    ...(id !== undefined && { id }),
    location,
    completionYear: year,
    size,
    isFeatured,
    translations: [
        { languageCode: 'en', title: titleEn, description: descEn },
        { languageCode: 'el', title: titleEl, description: descEl }
    ]
});

const buildEditPhotosOrder = (images: ProjectImage[]) => {
    const newPhotoFiles: File[] = [];
    const photosOrder = images.map((img, index) => {
        if (img.file) {
            const newPhotoIndex = newPhotoFiles.length;
            newPhotoFiles.push(img.file);
            return { newPhotoIndex, displayOrder: index + 1 };
        }
        return { id: Number(img.id), displayOrder: index + 1 };
    });
    return { photosOrder, newPhotoFiles };
};

const buildProjectFields = (
    t: TFunction,
    activeLang: 'el' | 'en',
    fields: TranslatedFields,
    setters: {
        setTitleEn: (value: string) => void;
        setTitleEl: (value: string) => void;
        setDescEn: (value: string) => void;
        setDescEl: (value: string) => void;
        setLocation: (value: string) => void;
        setYear: (value: string) => void;
        setSize: (value: string) => void;
    }
): FormField[] => {
    const isEn = activeLang === 'en';
    const currentTitle = isEn ? fields.titleEn : fields.titleEl;
    const currentTitleSetter = isEn ? setters.setTitleEn : setters.setTitleEl;
    const currentDesc = isEn ? fields.descEn : fields.descEl;
    const currentDescSetter = isEn ? setters.setDescEn : setters.setDescEl;
    const lang = activeLang.toUpperCase();

    return [
        { id: 'title', label: t('admin.projectManagement.titleLabel', { lang }), type: 'text', placeholder: t('admin.projectManagement.titlePlaceholder'), value: currentTitle, onChange: currentTitleSetter, required: true },
        { id: 'location', label: t('admin.projectManagement.locationLabel'), type: 'text', placeholder: t('admin.projectManagement.locationPlaceholder'), value: fields.location, onChange: setters.setLocation, required: true },
        { id: 'year', label: t('admin.projectManagement.yearLabel'), type: 'text', placeholder: t('admin.projectManagement.yearPlaceholder'), value: fields.year, onChange: setters.setYear, required: true },
        { id: 'size', label: t('admin.projectManagement.sizeLabel'), type: 'text', placeholder: t('admin.projectManagement.sizePlaceholder'), value: fields.size, onChange: setters.setSize, required: true },
        { id: 'description', label: t('admin.projectManagement.descriptionLabel', { lang }), type: 'textarea', placeholder: t('admin.projectManagement.descriptionPlaceholder'), value: currentDesc, onChange: currentDescSetter, required: true, rows: 5 }
    ];
};

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
    const [isFeatured, setIsFeatured] = useState(false);

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
        setIsFeatured(false);
        setHydratedId(null);
    };

    const currentProjectId = existingProject?.id ?? null;

    if (isEditMode && existingProject && hydratedId !== currentProjectId) {
        setHydratedId(currentProjectId);
        const hydrated = hydrateFromProject(existingProject);
        setLocation(hydrated.location);
        setYear(hydrated.year);
        setSize(hydrated.size);
        setTitleEl(hydrated.titleEl);
        setDescEl(hydrated.descEl);
        setTitleEn(hydrated.titleEn);
        setDescEn(hydrated.descEn);
        setImages(hydrated.images);
        setIsFeatured(hydrated.isFeatured);
    }

    const submitEdit = async (formData: FormData) => {
        if (!activeProjectId) return;
        const { photosOrder, newPhotoFiles } = buildEditPhotosOrder(images);
        const projectData = { ...buildProjectData({ location, year, size, titleEn, descEn, titleEl, descEl, isFeatured, id: activeProjectId }), photos: photosOrder };
        formData.append('projectData', JSON.stringify(projectData));
        newPhotoFiles.forEach(file => { formData.append('newPhotos', file); });
        await updateProject(formData);
    };

    const submitCreate = async (formData: FormData) => {
        const newPhotos = images.map(img => img.file).filter((file): file is File => !!file);
        const photosOrder = images.map((_, index) => ({ displayOrder: index + 1 }));
        const projectData = { ...buildProjectData({ location, year, size, titleEn, descEn, titleEl, descEl, isFeatured }), photos: photosOrder };
        formData.append('projectData', JSON.stringify(projectData));
        newPhotos.forEach(file => { formData.append('newPhotos', file); });
        await createProject(formData);
        resetForm();
    };

    const handleFormSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData();
        try {
            if (isEditMode && activeProjectId) {
                await submitEdit(formData);
            } else {
                await submitCreate(formData);
            }
        } catch (error) {
            console.error("Mutation failed", error);
        }
    };

    const projectFields = buildProjectFields(
        t,
        activeLang,
        { location, year, size, titleEl, descEl, titleEn, descEn, images, isFeatured },
        { setTitleEn, setTitleEl, setDescEn, setDescEl, setLocation, setYear, setSize }
    );

    return {
        t,
        isPending,
        activeLang,
        setActiveLang,
        images,
        setImages,
        isFeatured,
        setIsFeatured,
        projectFields,
        handleFormSubmit,
        resetForm
    };
};
