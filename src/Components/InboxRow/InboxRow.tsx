import { useState } from 'react';
import styles from './InboxRow.module.css';
import type { InboxRowProps } from "../../Types/IndexRow.ts";
import { useTranslation } from 'react-i18next';

const PREVIEW_LENGTH = 50;

export const InboxRow = ({ message, onClick, onDelete, showStatus = true, labels }: InboxRowProps) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const formattedDate = message.createdAt
                                ? new Date(message.createdAt).toLocaleDateString() : 'N/A';
    const isTruncatable = message.message.length > PREVIEW_LENGTH;
    return (
        <tr
            className={styles.row}
            onClick={() => onClick?.(message.id)}
            style={{ cursor: 'pointer' }} >
            <td data-label={labels.client}>
                <div className={styles['sender-info']}>
                    <span className={styles['sender-name']}>{message.fullName}</span>
                    <span className={styles['sender-email']}>{message.email}</span>
                </div>
            </td>
            <td data-label={labels.message} className={styles['subject-text']}>
                {isExpanded || !isTruncatable
                    ? message.message
                    : `${message.message.substring(0, PREVIEW_LENGTH)}...`}
                {isTruncatable && (
                    <button
                        type="button"
                        className={styles['expand-btn']}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded((prev) => !prev);
                        }}
                    >
                        {isExpanded ? t('admin.dashboard.inquiries.showLess') : t('admin.dashboard.inquiries.showMore')}
                    </button>
                )}
            </td>
            <td data-label={labels.date} className={styles['date-text']}>
                {formattedDate}
            </td>

            <td data-label={labels.status} className={styles['status-cell']}>
                <div className={styles['status-actions']}>
                    {showStatus && (
                        !message.isRead ? (
                            <span className={styles['unread-badge']}>
                                {t('admin.dashboard.inquiries.new')}<span className={styles.dot}>.</span>
                            </span>
                        ) : ( <span className={styles['read-badge']}>{t('admin.dashboard.inquiries.read')}</span> )
                    )}
                    {onDelete && (
                        <button
                            type="button"
                            className={styles['delete-btn']}
                            aria-label={labels.delete}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(message.id); }} >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 7h16" />
                                <path d="M9 7V4h6v3" />
                                <path d="M6 7l1 13h10l1-13" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                            </svg>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};