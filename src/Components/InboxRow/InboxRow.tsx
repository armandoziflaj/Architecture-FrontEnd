import styles from './InboxRow.module.css';
import type { InboxRowProps } from "../../Types/IndexRow.ts";

export const InboxRow = ({ message, onClick }: InboxRowProps) => {
    const formattedDate = message.createdAt
        ? new Date(message.createdAt).toLocaleDateString()
        : 'N/A';

    return (
        <tr
            className={`${styles.row} ${!message.isRead ? styles.unreadRow : ''}`}
            onClick={() => onClick?.(message.id)}
            style={{ cursor: 'pointer' }}
        >
            <td data-label="Name">
                <div className={styles.senderInfo}>
                    <span className={styles.senderName}>{message.fullName}</span>
                    <span className={styles.senderEmail}>{message.email}</span>
                </div>
            </td>

            <td data-label="Message" className={styles.subjectText}>
                {message.message.length > 50
                    ? `${message.message.substring(0, 50)}...`
                    : message.message}
            </td>

            <td data-label="Date" className={styles.dateText}>
                {formattedDate}
            </td>

            <td data-label="Status" style={{ textAlign: 'right' }}>
                {!message.isRead ? (
                    <span className={styles.unreadBadge}>
                        New<span className={styles.dot}>.</span>
                    </span>
                ) : (
                    <span className={styles.readBadge}>Read</span>
                )}
            </td>
        </tr>
    );
};