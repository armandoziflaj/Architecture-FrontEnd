import { api } from './axiosInstance';
import type {BaseResponse} from "../Types/BaseResponse.ts";
import type {ProjectResponse} from "../Types/ProjectResponse.ts";
import type {InquiryRequest} from "../Types/InquiryRequest.ts";

export const submitContactInquiry = async (
    inquiryData: InquiryRequest,
    signal?: AbortSignal
): Promise<BaseResponse<void>> => {
    const response = await api.post<BaseResponse<void>>(
        '/ContactInquiries/submit',
        inquiryData,
        { signal }
    );
    return response.data;
};
export const fetchProjectById = async (id: string, signal?: AbortSignal): Promise<BaseResponse<ProjectResponse>> => {
    const response = await api.get<BaseResponse<ProjectResponse>>(`/projects/${id}`, { signal });
    return response.data;
};