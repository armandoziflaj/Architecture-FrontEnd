import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
    title: string;
    actionLabel?: string;
    onActionClick?: () => void;
}

export const SectionHeader = ({ title, actionLabel, onActionClick }: SectionHeaderProps) => {
    return (
        <div className={styles['section-header']}>
            <h2 className={styles['section-title']}>{title}</h2>
            {actionLabel && (
                <span className={styles['section-link']} onClick={onActionClick}>
                    {actionLabel}
                </span>
            )}
        </div>
    );
};