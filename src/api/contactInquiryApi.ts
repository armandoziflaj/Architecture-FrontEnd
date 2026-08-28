import { api } from './axiosInstance';
import type {BaseResponse} from "../Types/BaseResponse.ts";
import type {ContactInquiryResponse, InquiryRequest} from "../Types/InquiryRequest.ts";
import type {PagedResponse} from "../Types/PagedResponse.ts";
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
    page = 1,
    pageSize = 20,
    onlyUnread = false,
    signal?: AbortSignal
): Promise<PagedResponse<ContactInquiryResponse[]>> => {
    const response = await api.get<PagedResponse<ContactInquiryResponse[]>>(
        '/contactinquiries/admin/all',
        { params: { page, pageSize, onlyUnread }, signal }
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

export const deleteInquiry = async (
    id: number,
    signal?: AbortSignal
): Promise<BaseResponse<null>> => {
    const response = await api.delete<BaseResponse<null>>(
        `/contactinquiries/admin/${id}`,
        { signal }
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
