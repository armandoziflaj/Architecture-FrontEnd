export interface ProjectTranslationResponse {
    languageCode: string;
    title: string;
    summary: string;
}

export interface PhotosResponse {
    id: number;
    imageUrl: string;
    altText?: string;
    isCover: boolean;
    displayOrder?: number;
}

export interface ProjectResponse {
    id: number;
    title: string;
    summary : string
    location: string;
    completionYear?: string;
    size: string;
    categoryId?: number;
    photos: PhotosResponse[];
}

export interface ProjectDetailedResponse extends ProjectResponse {
    summary: string;
    isFeatured?: boolean;
    translations: ProjectTranslationResponse[];
}