export interface ProjectResponse {
    id: number;
    title: string;
    summary: string;
    location: string;
    completionYear?: string;
    size: string;
    categoryId?: number;
    photos: PhotosResponse[];
}

export interface PhotosResponse {
    id: number;
    imageUrl: string;
    altText: string;
}