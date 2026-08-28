import React from 'react';
import type { MessageData } from '../../../../Types/IndexRow.ts';
import styles from '../Dashboard.module.css';
import { InboxRow } from "../../../../Components/InboxRow/InboxRow.tsx";
import { useTranslation } from 'react-i18next';

interface RecentInquiriesTableProps {
    messages?: MessageData[];
    isLoading?: boolean;
    onMessageClick: (_id: number) => void;
    onDeleteMessage: (_id: number) => void;
    emptyTextKey?: string;
    showStatus?: boolean;
}

export const RecentInquiriesTable: React.FC<RecentInquiriesTableProps> = ({
                                                                              messages,
                                                                              isLoading = false,
                                                                              onMessageClick,
                                                                              onDeleteMessage,
                                                                              emptyTextKey = 'admin.dashboard.inquiries.empty',
                                                                              showStatus = true
                                                                          }) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <div className={styles['loading-text']}>{t('admin.dashboard.inquiries.loading')}</div>;
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return <div className={styles['empty-text']}>{t(emptyTextKey)}</div>;
    }

    return (
        <div className={styles['table-wrapper']}>
            <table className={styles['admin-table']}>
                <thead>
                <tr>
                    <th>{t('admin.dashboard.inquiries.client')}</th>
                    <th>{t('admin.dashboard.inquiries.message')}</th>
                    <th>{t('admin.dashboard.inquiries.date')}</th>
                    <th style={{ textAlign: 'right' }}>
                        {showStatus ? t('admin.dashboard.inquiries.status') : t('admin.dashboard.inquiries.actions')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {messages.map((msg) => (
                    <InboxRow
                        key={msg.id}
                        message={msg}
                        onClick={() => onMessageClick(msg.id)}
                        onDelete={onDeleteMessage}
                        showStatus={showStatus}
                        labels={{
                            client: t('admin.dashboard.inquiries.client'),
                            message: t('admin.dashboard.inquiries.message'),
                            date: t('admin.dashboard.inquiries.date'),
                            status: t('admin.dashboard.inquiries.status'),
                            delete: t('admin.dashboard.inquiries.delete'),
                        }}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};