import axios from "axios";
import type {BaseResponse} from "../Types/BaseResponse.ts";

export const handleApiError = (err: unknown): never => {
    if (axios.isAxiosError<BaseResponse<unknown>>(err)) {
        const serverMessage = err.response?.data?.message;
        throw new Error(serverMessage || "A server error occurred");
    }

    if (err instanceof Error) {
        throw err;
    }

    throw new Error("An unexpected error occurred");
};