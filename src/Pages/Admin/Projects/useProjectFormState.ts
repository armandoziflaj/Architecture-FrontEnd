import { useState } from 'react';
import type { ProjectImage } from '../../../Types/ProjectAdmin';
import type {ProjectDetailedResponse} from "../../../Types/ProjectResponse.ts";

export const useProjectFormState = (
    isEditMode: boolean,
    existingProject?: ProjectDetailedResponse | null
) => {
    // Track the project ID we last hydrated from
    const [hydratedId, setHydratedId] = useState<number | null>(null);

    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [size, setSize] = useState('');
    const [images, setImages] = useState<ProjectImage[]>([]);

    const [titleEl, setTitleEl] = useState('');
    const [descEl, setDescEl] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [descEn, setDescEn] = useState('');

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
        setYear(existingProject.completionYear || '');
        setSize(existingProject.size || '');

        const elTrans = existingProject.translations?.find(
            t => t.languageCode.toLowerCase() === 'el'
        );
        const enTrans = existingProject.translations?.find(
            t => t.languageCode.toLowerCase() === 'en'
        );

        setTitleEl(elTrans?.title || existingProject.title || '');
        setDescEl(elTrans?.summary || existingProject.summary || '');
        setTitleEn(enTrans?.title || existingProject.title || '');
        setDescEn(enTrans?.summary || existingProject.summary || '');

        if (existingProject.photos) {
            const mappedImages: ProjectImage[] = existingProject.photos.map(photo => ({
                id: String(photo.id),
                url: photo.imageUrl.startsWith('http')
                    ? photo.imageUrl
                    : `${import.meta.env.VITE_API_BASE_URL}${photo.imageUrl.startsWith('/') ? photo.imageUrl : `/${photo.imageUrl}`}`,
                sortOrder: photo.displayOrder || 0
            }));
            setImages(mappedImages);
        }
    }

    return {
        state: { location, year, size, images, titleEl, descEl, titleEn, descEn },
        setters: { setLocation, setYear, setSize, setImages, setTitleEl, setDescEl, setTitleEn, setDescEn },
        resetForm
    };
};