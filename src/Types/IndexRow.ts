export interface MessageData {
    id: string;
    name: string;
    email: string;
    subject: string;
    date: string;
    unread: boolean;
}

export interface InboxRowProps {
    message: MessageData;
    onClick?: (id: string) => void;
}