import { api } from "./axiosInstance";
import type { BaseResponse } from "../Types/BaseResponse.ts";
import type { LoginRequest } from "../Types/LoginRequest.ts";

export const loginAdmin =
    async (credentials: LoginRequest, signal?: AbortSignal): Promise<BaseResponse<void>> =>
    {
    const response
        = await api.post<BaseResponse<void>>('/authentication/login', credentials, { signal });
    return response.data;
};

export const refreshAdminToken = async (signal?: AbortSignal): Promise<BaseResponse<void>> => {
    const response
        = await api.post<BaseResponse<void>>('/authentication/refresh', {}, { signal });
    return response.data;
};

export const logoutAdmin = async (): Promise<BaseResponse<void>> => {
    const response
        = await api.post<BaseResponse<void>>('/authentication/logout');
    return response.data;
};