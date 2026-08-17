import React from 'react';
import type { MessageData } from '../../../../Types/IndexRow.ts';
import styles from '../Dashboard.module.css';
import { InboxRow } from "../../../../Components/InboxRow/InboxRow.tsx";
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    if (isLoading) {
        return <div className={styles['loading-text']}>{t('admin.dashboard.inquiries.loading')}</div>;
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return <div className={styles['empty-text']}>{t('admin.dashboard.inquiries.empty')}</div>;
    }

    return (
        <div className={styles['table-wrapper']}>
            <table className={styles['admin-table']}>
                <thead>
                <tr>
                    <th>{t('admin.dashboard.inquiries.client')}</th>
                    <th>{t('admin.dashboard.inquiries.message')}</th>
                    <th>{t('admin.dashboard.inquiries.date')}</th>
                    <th style={{ textAlign: 'right' }}>{t('admin.dashboard.inquiries.status')}</th>
                </tr>
                </thead>
                <tbody>
                {messages.map((msg) => (
                    <InboxRow
                        key={msg.id}
                        message={msg}
                        onClick={() => onMessageClick(msg.id)}
                        labels={{
                            client: t('admin.dashboard.inquiries.client'),
                            message: t('admin.dashboard.inquiries.message'),
                            date: t('admin.dashboard.inquiries.date'),
                            status: t('admin.dashboard.inquiries.status'),
                        }}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};