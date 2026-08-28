import {deleteInquiry, getAllInquiries, getVisitorCount, submitContactInquiry, toggleInquiryRead} from "../api/contactInquiryApi.ts";
import type {InquiryRequest} from "../Types/InquiryRequest.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {handleApiError} from "./handleApiError.ts";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

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

export const useContactInquiries = (page = 1, pageSize = 20, onlyUnread = false) => {
    return useQuery({
        queryKey: ['admin-inquiries', 'list', page, pageSize, onlyUnread],
        queryFn: ({ signal }) => getAllInquiries(page, pageSize, onlyUnread, signal),
        staleTime: 1000 * 60 * 2,
    });
};

export const useUnreadInquiriesCount = () => {
    return useQuery({
        queryKey: ['admin-inquiries', 'unread-count'],
        queryFn: ({ signal }) => getAllInquiries(1, 1, true, signal),
        staleTime: 1000 * 60 * 2,
        select: (data) => data.totalCount,
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
            void queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
        },
    });
};

export const useDeleteInquiry = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (id: number) =>
            toast.promise(deleteInquiry(id), {
                loading: t('toasts.deletingMessage'),
                success: t('toasts.deleteMessageSuccess'),
                error: (err) => err.message || t('toasts.deleteMessageError'),
            }),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
        }
    });
};

export const useVisitorCount = () => {
    return useQuery({
        queryKey: ['visitor-count'],
        queryFn: ({ signal }) => getVisitorCount(signal),
        staleTime: 1000 * 60 * 3,
    });
};
