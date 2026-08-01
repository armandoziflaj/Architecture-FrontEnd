import {submitContactInquiry} from "../api/contactInquiryApi.ts";
import type {InquiryRequest} from "../Types/InquiryRequest.ts";
import type {BaseResponse} from "../Types/BaseResponse.ts";
import {useMutation} from "@tanstack/react-query";

export const useSubmitContactInquiry = () => {
    return useMutation<BaseResponse<void>, Error, InquiryRequest>({
        mutationFn: async (contactInquiry: InquiryRequest) => {
            const result = await submitContactInquiry(contactInquiry);
            if (!result.success) {
                throw new Error(result.message || "Failed to submit inquiry");
            }
            return result;
        }
    });
};

// export const useProjectById = (id: string, lang: string) => {
//     return useApiQuery<ProjectResponse>(
//         ['project', id, lang],
//         async ({ signal }) => {
//             try {
//                 const result = await fetchProjectById(id, signal);
//
//                 if (!result.success) {
//                     return handleApiError( new Error(result.message || "Failed to load project"));
//                 }
//
//                 return result.data;
//             } catch (err) {
//                 return handleApiError(err);
//             }
//         },
//         { enabled: !!id }
//     );
// };