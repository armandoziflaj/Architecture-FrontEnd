import {getAllInquiries, getVisitorCount, submitContactInquiry, toggleInquiryRead} from "../api/contactInquiryApi.ts";
import type {InquiryRequest} from "../Types/InquiryRequest.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {handleApiError} from "./handleApiError.ts";

export const useSubmitInquiry = () => {
    return useMutation({
        mutationFn: async (data: InquiryRequest) => {
            try {
                await submitContactInquiry(data);
            } catch (err) {
                return handleApiError(err);
            }
        },
    });
};

export const useContactInquiries = () => {
    return useQuery({
        queryKey: ['admin-inquiries'],
        queryFn: ({ signal }) => getAllInquiries(signal),
        staleTime: 1000 * 60 * 2,
        select: (data) => data.data,
    });
};

export const useToggleInquiryRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            try {
                return await toggleInquiryRead(id);
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
        },
    });
};

export const useVisitorCount = () => {
    return useQuery({
        queryKey: ['visitor-count'],
        queryFn: ({ signal }) => getVisitorCount(signal),
        staleTime: 1000 * 60 * 3,
    });
};
