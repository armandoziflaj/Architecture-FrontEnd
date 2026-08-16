import React, { useEffect } from 'react';
import styles from './FormSubmissionStatus.module.css';
import { useTranslation } from 'react-i18next';

interface FormSubmissionStatusProps {
  isPending: boolean;
  isSuccess: boolean;
  onClose: () => void;
}

export const FormSubmissionStatus: React.FC<FormSubmissionStatusProps> = ({ isPending, isSuccess, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    let timer:number;
    if (isSuccess) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess, onClose]);

  if (isPending) {
    return (
      <div className={styles.overlay}>
        <div className={styles.spinner}></div>
        <p className={styles['status-text']}>{t('contact.sending')}</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.overlay}>
        <div className={styles['success-checkmark']}>
          <svg className={styles['check-icon']} viewBox="0 0 52 52">
            <circle className={styles['check-circle']} cx="26" cy="26" r="25" fill="none" />
            <path className={styles['check-mark']} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <p className={styles['status-text']}>{t('contact.success')}</p>
      </div>
    );
  }

  return null;
};