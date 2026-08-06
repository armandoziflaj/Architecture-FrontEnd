export interface MessageData {
    id: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface InboxRowProps {
    message: MessageData;
    onClick?: (id: number) => void;
}