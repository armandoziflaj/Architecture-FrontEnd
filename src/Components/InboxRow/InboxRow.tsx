import styles from './InboxRow.module.css';
import type {InboxRowProps} from "../../Types/IndexRow.ts";

export const InboxRow = ({ message, onClick }: InboxRowProps) => {
    return (
        <tr className={styles.row} onClick={() => onClick?.(message.id)}>
            <td data-label="Name">
                <div className={styles.senderInfo}>
                    <span className={styles.senderName}>{message.name}</span>
                    <span className={styles.senderEmail}>{message.email}</span>
                </div>
            </td>
            <td data-label="Project / Subject" className={styles.subjectText}>
                {message.subject}
            </td>
            <td data-label="Date" className={styles.dateText}>
                {message.date}
            </td>
            <td data-label="Status" style={{ textAlign: 'right' }}>
                {message.unread ? (
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