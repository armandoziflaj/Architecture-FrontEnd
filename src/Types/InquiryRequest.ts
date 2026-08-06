export interface InquiryRequest {
    fullName: string;
    email: string;
    phoneNumber?: string;
    message: string;
}

export interface ContactInquiryResponse {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface SubmitContactInquiryRequest {
    fullName: string;
    email: string;
    phoneNumber?: string;
    message: string;
}