import { api } from './axiosInstance';
import type {BaseResponse} from "../Types/BaseResponse.ts";
import type {ProjectDetailedResponse, ProjectResponse} from "../Types/ProjectResponse.ts";

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
    formData: FormData,
    signal?: AbortSignal
): Promise<BaseResponse<{ id: number }>> => {
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
    formData: FormData,
    signal?: AbortSignal
): Promise<BaseResponse<void>> => {
    const projectData = JSON.parse(formData.get('projectData') as string);
    const response = await api.put<BaseResponse<void>>( // Changed type here
        `/projects/${projectData.id}`,
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