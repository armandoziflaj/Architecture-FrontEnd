import React from 'react';
import type { MessageData } from '../../../../Types/IndexRow.ts';
import styles from '../Dashboard.module.css';
import {InboxRow} from "../../../../Components/InboxRow/InboxRow.tsx";

interface RecentInquiriesTableProps {
    messages: MessageData[];
    onMessageClick: (id: string) => void;
}

export const RecentInquiriesTable: React.FC<RecentInquiriesTableProps> = ({
                                                                              messages,
                                                                              onMessageClick
                                                                          }) => {
    return (
        <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
            <thead>
                <tr>
                    <th>Name</th>
            <th>Project / Subject</th>
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