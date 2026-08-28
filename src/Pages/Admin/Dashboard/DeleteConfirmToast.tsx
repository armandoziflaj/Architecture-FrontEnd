import type { TFunction } from 'i18next';
import styles from './Dashboard.module.css';

interface DeleteConfirmToastProps {
    t: TFunction;
    title?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteConfirmToast = ({ t, title, onConfirm, onCancel }: DeleteConfirmToastProps) => (
    <span className={styles['confirm-toast']}>
        {title ?? t('admin.dashboard.deleteConfirmation.title')}
        <button className={styles['confirm-toast-btn']} onClick={onConfirm}>
            {t('admin.dashboard.deleteConfirmation.yes')}
        </button>
        <button className={styles['confirm-toast-btn']} onClick={onCancel}>
            {t('admin.dashboard.deleteConfirmation.no')}
        </button>
    </span>
);
