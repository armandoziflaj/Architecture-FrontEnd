import type { TFunction } from 'i18next';
import styles from './Dashboard.module.css';

interface DeleteConfirmToastProps {
    t: TFunction;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteConfirmToast = ({ t, onConfirm, onCancel }: DeleteConfirmToastProps) => (
    <span className={styles['confirm-toast']}>
        {t('admin.dashboard.deleteConfirmation.title')}
        <button className={styles['confirm-toast-btn']} onClick={onConfirm}>
            {t('admin.dashboard.deleteConfirmation.yes')}
        </button>
        <button className={styles['confirm-toast-btn']} onClick={onCancel}>
            {t('admin.dashboard.deleteConfirmation.no')}
        </button>
    </span>
);
