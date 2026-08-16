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