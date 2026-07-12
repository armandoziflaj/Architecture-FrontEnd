import { api } from './axiosInstance';
import type {BaseResponse} from "../Types/BaseResponse.ts";
import type {ProjectResponse} from "../Types/ProjectResponse.ts";

export const fetchProjects = async (signal?: AbortSignal): Promise<BaseResponse<ProjectResponse[]>> => {
    const response = await api.get<BaseResponse<ProjectResponse[]>>('/projects', { signal });
    return response.data;
};
export const fetchProjectById = async (id: string, signal?: AbortSignal): Promise<BaseResponse<ProjectResponse>> => {
    const response = await api.get<BaseResponse<ProjectResponse>>(`/projects/${id}`, { signal });
    return response.data;
};