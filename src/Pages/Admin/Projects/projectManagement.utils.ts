import type { ProjectImage } from '../../../Types/ProjectAdmin';

interface BuildUpdateFormDataParams {
    id: number;
    location?: string;
    year?: string;
    size?: string;
    titleEn?: string;
    descEn?: string;
    titleEl?: string;
    descEl?: string;
    images: ProjectImage[];
}

export const buildUpdateFormData = ({
                                        id,
                                        location,
                                        year,
                                        size,
                                        titleEn,
                                        descEn,
                                        titleEl,
                                        descEl,
                                        images
                                    }: BuildUpdateFormDataParams): FormData => {
    const formData = new FormData();

    formData.append('Id', id.toString());
    formData.append('Location', location ?? '');
    formData.append('CompletionYear', year ?? '');
    formData.append('Size', size ?? '');
    formData.append('IsFeatured', String(false));

    // Localized Translations
    formData.append('Translations[0].LanguageCode', 'en');
    formData.append('Translations[0].Title', titleEn ?? '');
    formData.append('Translations[0].Description', descEn ?? '');

    formData.append('Translations[1].LanguageCode', 'el');
    formData.append('Translations[1].Title', titleEl ?? '');
    formData.append('Translations[1].Description', descEl ?? '');

    // Photos Split: Retained vs New Files
    let retainedIndex = 0;
    let newFileIndex = 0;

    images.forEach((img, index) => {
        const displayOrder = (index + 1).toString();

        if (img.file) {
            formData.append('NewPhotos', img.file);
            formData.append(`NewPhotoDisplayOrders[${newFileIndex}]`, displayOrder);
            newFileIndex++;
        } else {
            formData.append(`RetainedPhotos[${retainedIndex}].Id`, String(img.id ?? ''));
            formData.append(`RetainedPhotos[${retainedIndex}].ImageUrl`, img.url ?? '');
            formData.append(`RetainedPhotos[${retainedIndex}].DisplayOrder`, displayOrder);
            retainedIndex++;
        }
    });

    return formData;
};