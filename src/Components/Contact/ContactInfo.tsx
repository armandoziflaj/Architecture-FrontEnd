import type { TFunction } from 'i18next';
import styles from './Contact.module.css';

interface ContactInfoProps {
    t: TFunction;
}

export const ContactInfo = ({ t }: ContactInfoProps) => (
    <div className={styles['info-column']}>
        <div className={styles['info-group']}>
            <h4>{t('contact.general')}</h4>
            <p>
                <a href="mailto:hello@example.com" className={styles.link}>
                    hello@example.com
                </a>
            </p>
            <p>+30 210 000 0000</p>
        </div>

        <div className={styles['info-group']}>
            <h4>{t('contact.address')}</h4>
            <p>{t('contact.street')}</p>
            <p>{t('contact.city')}</p>
        </div>
    </div>
);
