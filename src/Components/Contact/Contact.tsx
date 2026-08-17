import styles from './Contact.module.css';
import { GenericForm } from "../GenericForm/GenericForm.tsx";
import { useInViewAnimation } from "../../hooks/useInViewAnimation.ts";
import { FormSubmissionStatus } from '../FormSubmissionStatus/FormSubmissionStatus.tsx';
import { useContactForm } from '../../hooks/useContactForm.ts';

export const Contact = () => {
    const { ref, inView } = useInViewAnimation();
    const {
        t,
        showStatus,
        isPending,
        isSuccess,
        isError,
        error,
        contactFields,
        handleContactSubmit,
        handleCloseStatus
    } = useContactForm();

    return (
        <section
            ref={ref}
            className={styles.section}
            id="contact"
            data-inview={inView}>
            <div className={styles['header-block']}>
                <span className={styles.subtitle}>{t('contact.subtitle')}</span>
                <h2 className={styles.title}>{t('contact.title')}</h2>
            </div>

            <div className={styles['content-layout']}>
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

                <div className={styles['form-container']}>
                    {(isPending || isSuccess) && showStatus && (
                        <FormSubmissionStatus
                            isPending={isPending}
                            isSuccess={isSuccess}
                            onClose={handleCloseStatus}
                        />
                    )}

                    {isError && <div className={styles['error-banner']}>{error?.message || t('contact.error')}</div>}
                    <GenericForm
                        fields={contactFields}
                        submitLabel={isPending && showStatus ? t('contact.sending') : t('contact.submit')}
                        onSubmit={handleContactSubmit}
                        disabled={isPending && showStatus}
                    />
                </div>
            </div>
        </section>
    );
};