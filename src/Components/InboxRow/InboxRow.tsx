import styles from './InboxRow.module.css';
import type { InboxRowProps } from "../../Types/IndexRow.ts";
import { useTranslation } from 'react-i18next';

export const InboxRow = ({ message, onClick, labels }: InboxRowProps) => {
    const { t } = useTranslation();
    const formattedDate = message.createdAt
        ? new Date(message.createdAt).toLocaleDateString()
        : 'N/A';

    return (
        <tr
            className={styles.row}
            onClick={() => onClick?.(message.id)}
            style={{ cursor: 'pointer' }}
        >
            <td data-label={labels.client}>
                <div className={styles['sender-info']}>
                    <span className={styles['sender-name']}>{message.fullName}</span>
                    <span className={styles['sender-email']}>{message.email}</span>
                </div>
            </td>

            <td data-label={labels.message} className={styles['subject-text']}>
                {message.message.length > 50
                    ? `${message.message.substring(0, 50)}...`
                    : message.message}
            </td>

            <td data-label={labels.date} className={styles['date-text']}>
                {formattedDate}
            </td>

            <td data-label={labels.status} style={{ textAlign: 'right' }}>
                {!message.isRead ? (
                    <span className={styles['unread-badge']}>
                        {t('admin.dashboard.inquiries.new')}<span className={styles.dot}>.</span>
                    </span>
                ) : (
                    <span className={styles['read-badge']}>{t('admin.dashboard.inquiries.read')}</span>
                )}
            </td>
        </tr>
    );
};