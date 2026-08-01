import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
    title: string;
    actionLabel?: string;
    onActionClick?: () => void;
}

export const SectionHeader = ({ title, actionLabel, onActionClick }: SectionHeaderProps) => {
    return (
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {actionLabel && (
                <span className={styles.sectionLink} onClick={onActionClick}>
                    {actionLabel}
                </span>
            )}
        </div>
    );
};