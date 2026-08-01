import { api } from './axiosInstance';
import type {BaseResponse} from "../Types/BaseResponse.ts";
import type {ProjectDetailedResponse, ProjectResponse} from "../Types/ProjectResponse.ts";
import type {CreateProjectRequest, UpdateProjectRequest} from "../Types/ProjectAdmin.ts";

export const fetchProjects = async (
    signal?: AbortSignal,): Promise<BaseResponse<ProjectResponse[]>> => {
    const response =
        await api.get<BaseResponse<ProjectResponse[]>>('/projects', { signal });
    return response.data;
};
export const fetchProjectById = async (id: string, signal?: AbortSignal): Promise<BaseResponse<ProjectDetailedResponse>> => {
    const response =
        await api.get<BaseResponse<ProjectDetailedResponse>>(`/projects/${id}`, { signal });
    return response.data;
};

export const createProject = async (
    data: CreateProjectRequest,
    signal?: AbortSignal
): Promise<BaseResponse<{ id: number }>> => {
    const formData = new FormData();

    formData.append("Location", data.location);
    formData.append("CompletionYear", data.completionYear);
    formData.append("Size", data.size);
    formData.append("IsFeatured", String(data.isFeatured));
    if (data.categoryId) {
        formData.append("CategoryId", data.categoryId.toString());
    }

    data.translations.forEach((trans, idx) => {
        formData.append(`Translations[${idx}].LanguageCode`, trans.languageCode);
        formData.append(`Translations[${idx}].Title`, trans.title);
        formData.append(`Translations[${idx}].Description`, trans.description);
    });

    data.photos.forEach((file, idx) => {
        formData.append("Photos", file);
        formData.append("DisplayOrders", data.displayOrders[idx].toString());
    });

    const response =
        await api.post<BaseResponse<{ id: number }>>('/projects', formData, {
        signal,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

export const updateProject = async (
    data: UpdateProjectRequest,
    signal?: AbortSignal
): Promise<BaseResponse<{ isSuccess: boolean }>> => {
    const formData = new FormData();

    formData.append("Id", data.id.toString());
    formData.append("Location", data.location ?? "");
    formData.append("CompletionYear", data.completionYear ?? "");
    formData.append("Size", data.size ?? "");
    formData.append("IsFeatured", String(data.isFeatured));

    if (data.categoryId) {
        formData.append("CategoryId", data.categoryId.toString());
    }

    data.translations.forEach((trans, idx) => {
        formData.append(`Translations[${idx}].LanguageCode`, trans.languageCode);
        formData.append(`Translations[${idx}].Title`, trans.title ?? "");
        formData.append(`Translations[${idx}].Description`, trans.description ?? "");
    });

    data.retainedPhotos.forEach((photo, idx) => {
        formData.append(`RetainedPhotos[${idx}].Id`, photo.id.toString());
        formData.append(`RetainedPhotos[${idx}].ImageUrl`, photo.imageUrl ?? "");
        formData.append(`RetainedPhotos[${idx}].DisplayOrder`, photo.displayOrder.toString());
    });

    data.newPhotos.forEach((file, idx) => {
        formData.append("NewPhotos", file);
        formData.append(`NewPhotoDisplayOrders[${idx}]`, data.newPhotoDisplayOrders[idx].toString());
    });

    const response = await api.put<BaseResponse<{ isSuccess: boolean }>>(
        `/projects/${data.id}`,
        formData,
        {
            signal,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );

    return response.data;
};

export const deleteProject = async (
    id: number,
    signal?: AbortSignal
): Promise<BaseResponse<{ isSuccess: boolean }>> => {
    const response = await api.delete<BaseResponse<{ isSuccess: boolean }>>(
        `/projects/${id}`,
        { signal }
    );
    return response.data;
};