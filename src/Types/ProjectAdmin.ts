export interface ProjectTranslation {
    title: string;
    description: string;
}

export interface ProjectImage {
    id?: string;
    url: string;
    file?: File;
    sortOrder: number;
}

export interface ProjectTranslationDto {
    languageCode: string;
    title: string;
    description: string;
}

export interface ExistingPhotoDto {
    id: number;
    imageUrl: string;
    displayOrder: number;
}

export interface CreateProjectRequest {
    location: string;
    completionYear: string;
    size: string;
    isFeatured: boolean;
    categoryId?: number;
    translations: ProjectTranslationDto[];
    photos: File[];
    displayOrders: number[];
}

export interface UpdateProjectRequest {
    id: number;
    location: string;
    completionYear: string;
    size: string;
    isFeatured: boolean;
    categoryId?: number;
    translations: ProjectTranslationDto[];
    retainedPhotos: ExistingPhotoDto[];
    newPhotos: File[];
    newPhotoDisplayOrders: number[];
}
// 1. Create Mapper
export const mapToCreateProjectPayload = (
    location: string,
    year: string,
    size: string,
    isFeatured: boolean,
    translations: { el: ProjectTranslation; en: ProjectTranslation },
    images: ProjectImage[],
    categoryId?: number
): CreateProjectRequest => {
    const rawFiles: File[] = [];
    const orders: number[] = [];

    images.forEach((img) => {
        if (img.file) {
            rawFiles.push(img.file);
            orders.push(img.sortOrder);
        }
    });

    return {
        location,
        completionYear: year,
        size,
        isFeatured,
        categoryId,
        translations: [
            { languageCode: "en", title: translations.en.title, description: translations.en.description },
            { languageCode: "el", title: translations.el.title, description: translations.el.description }
        ],
        photos: rawFiles,
        displayOrders: orders
    };
};

// 2. Update Mapper
export const mapToUpdateProjectPayload = (
    id: number,
    location: string,
    year: string,
    size: string,
    isFeatured: boolean,
    translations: { el: ProjectTranslation; en: ProjectTranslation },
    images: ProjectImage[],
    categoryId?: number,
    apiBaseUrl = "http://localhost:5188"
): UpdateProjectRequest => {
    const retainedPhotos: ExistingPhotoDto[] = [];
    const newPhotos: File[] = [];
    const newPhotoDisplayOrders: number[] = [];

    images.forEach((img) => {
        if (img.file) {
            // Newly uploaded file in edit mode
            newPhotos.push(img.file);
            newPhotoDisplayOrders.push(img.sortOrder);
        } else if (img.id) {
            // Retained photo from database
            // Convert full preview URL back to relative URL expected by .NET
            const cleanRelativeUrl = img.url.startsWith("http")
                ? img.url.replace(apiBaseUrl, "")
                : img.url;

            retainedPhotos.push({
                id: Number(img.id),
                imageUrl: cleanRelativeUrl,
                displayOrder: img.sortOrder
            });
        }
    });

    return {
        id,
        location,
        completionYear: year,
        size,
        isFeatured,
        categoryId,
        translations: [
            { languageCode: "en", title: translations.en.title, description: translations.en.description },
            { languageCode: "el", title: translations.el.title, description: translations.el.description }
        ],
        retainedPhotos,
        newPhotos,
        newPhotoDisplayOrders
    };
};