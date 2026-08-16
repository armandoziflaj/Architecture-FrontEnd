import styles from './Profile.module.css';
import { useTranslation } from "react-i18next";

export const Profile = () => {
    const { t } = useTranslation();

    const expertise = t('profile.expertiseList', { returnObjects: true });
    const recognition = t('profile.recognitionList', { returnObjects: true });

    return (
        <section className={styles.section} id="profile">
            <div className={styles['manifesto-block']}>
                <span className={styles.subtitle}>{t('profile.subtitle')}</span>
                <h2 className={styles['manifesto-text']}>
                    {t('profile.manifesto')}
                </h2>
            </div>

            <div className={styles['details-grid']}>
                <div className={styles.column}>
                    <h3 className={styles['column-title']}>{t('profile.titles.expertise')}</h3>
                    <ul className={styles.list}>
                        {Array.isArray(expertise) && expertise.map((item, index) => (
                            <li key={index} className={styles['list-item']}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles['column-title']}>{t('profile.titles.recognition')}</h3>
                    <ul className={styles.list}>
                        {Array.isArray(recognition) && recognition.map((item, index) => (
                            <li key={index} className={styles['list-item']}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};