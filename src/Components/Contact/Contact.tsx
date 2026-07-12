import styles from './Contact.module.css';
import { useTranslation } from "react-i18next";

export const Contact = () => {
    const { t } = useTranslation();

    return (
        <section className={styles.section} id="contact">
            <div className={styles.headerBlock}>
                <span className={styles.subtitle}>{t('contact.subtitle')}</span>
                <h2 className={styles.title}>{t('contact.title')}</h2>
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.infoColumn}>
                    <div className={styles.infoGroup}>
                        <h4>{t('contact.general')}</h4>
                        <p><a href="mailto:hello@studio.com" className={styles.link}>hello@studio.com</a></p>
                        <p>+30 210 000 0000</p>
                    </div>

                    <div className={styles.infoGroup}>
                        <h4>{t('contact.address')}</h4>
                        <p>{t('contact.street')}</p>
                        <p>{t('contact.city')}</p>
                    </div>
                </div>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">{t('contact.labels.name')}</label>
                        <input
                            type="text"
                            id="name"
                            required
                            placeholder={t('contact.placeholders.name')}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">{t('contact.labels.email')}</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder={t('contact.placeholders.email')}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="message">{t('contact.labels.message')}</label>
                        <textarea
                            id="message"
                            rows={4}
                            required
                            placeholder={t('contact.placeholders.message')}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {t('contact.submit')}
                    </button>
                </form>
            </div>
        </section>
    );
};