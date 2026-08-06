import { api } from './axiosInstance';
import type {BaseResponse} from "../Types/BaseResponse.ts";
import type {ContactInquiryResponse, InquiryRequest} from "../Types/InquiryRequest.ts";
import type {VisitorCount} from "../Types/VisitorCount.ts";

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
export const getAllInquiries = async (
    signal?: AbortSignal
): Promise<BaseResponse<ContactInquiryResponse[]>> => {
    const response = await api.get<BaseResponse<ContactInquiryResponse[]>>(
        '/contactinquiries/admin/all',
        { signal }
    );
    return response.data;
};

export const toggleInquiryRead = async (
    id: number
): Promise<{ success: boolean; isRead: boolean }> => {
    const response = await api.put<{ success: boolean; isRead: boolean }>(
        `/contactinquiries/admin/${id}/toggle-read`
    );
    return response.data;
};

export const getVisitorCount = async (
    signal?: AbortSignal
): Promise<BaseResponse<VisitorCount>> => {
    const response = await api.get<BaseResponse<VisitorCount>>(
        '/VisitorCounter',
        { signal }
    );
    return response.data;
};
