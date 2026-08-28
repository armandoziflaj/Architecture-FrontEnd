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
    onClick?: (_id: number) => void;
    onDelete?: (_id: number) => void;
    labels: {
        client: string;
        message: string;
        date: string;
        status: string;
        delete: string;
    };
}
