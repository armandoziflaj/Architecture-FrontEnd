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
            className={`${styles.row} ${!message.isRead ? styles.unreadRow : ''}`}
            onClick={() => onClick?.(message.id)}
            style={{ cursor: 'pointer' }}
        >
            <td data-label={labels.client}>
                <div className={styles.senderInfo}>
                    <span className={styles.senderName}>{message.fullName}</span>
                    <span className={styles.senderEmail}>{message.email}</span>
                </div>
            </td>

            <td data-label={labels.message} className={styles.subjectText}>
                {message.message.length > 50
                    ? `${message.message.substring(0, 50)}...`
                    : message.message}
            </td>

            <td data-label={labels.date} className={styles.dateText}>
                {formattedDate}
            </td>

            <td data-label={labels.status} style={{ textAlign: 'right' }}>
                {!message.isRead ? (
                    <span className={styles.unreadBadge}>
                        {t('admin.dashboard.inquiries.new')}<span className={styles.dot}>.</span>
                    </span>
                ) : (
                    <span className={styles.readBadge}>{t('admin.dashboard.inquiries.read')}</span>
                )}
            </td>
        </tr>
    );
};
