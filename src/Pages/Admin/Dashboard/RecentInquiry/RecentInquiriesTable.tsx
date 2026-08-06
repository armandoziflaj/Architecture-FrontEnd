import React from 'react';
import type { MessageData } from '../../../../Types/IndexRow.ts';
import styles from '../Dashboard.module.css';
import { InboxRow } from "../../../../Components/InboxRow/InboxRow.tsx";

interface RecentInquiriesTableProps {
    messages?: MessageData[];
    isLoading?: boolean;
    onMessageClick: (id: number) => void;
}

export const RecentInquiriesTable: React.FC<RecentInquiriesTableProps> = ({
                                                                              messages,
                                                                              isLoading = false,
                                                                              onMessageClick
                                                                          }) => {
    if (isLoading) {
        return <div className={styles.loadingText}>Loading client inquiries...</div>;
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return <div className={styles.emptyText}>No recent inquiries found.</div>;
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
                <thead>
                <tr>
                    <th>Client</th>
                    <th>Message Preview</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Status</th>
                </tr>
                </thead>
                <tbody>
                {messages.map((msg) => (
                    <InboxRow
                        key={msg.id}
                        message={msg}
                        onClick={() => onMessageClick(msg.id)}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};