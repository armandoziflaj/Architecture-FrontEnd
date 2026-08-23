import { motion, useReducedMotion } from "framer-motion";
import styles from './Contact.module.css';
import { GenericForm } from "../GenericForm/GenericForm.tsx";
import { FormSubmissionStatus } from '../FormSubmissionStatus/FormSubmissionStatus.tsx';
import { ContactInfo } from './ContactInfo.tsx';
import { useContactForm } from '../../hooks/useContactForm.ts';
import { fadeUp, viewportOnce, withReducedMotion } from '../../animations/variants';

export const Contact = () => {
    const reduceMotion = useReducedMotion();
    const sectionVariants = withReducedMotion(fadeUp, !!reduceMotion);
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
        <motion.section
            className={styles.section}
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionVariants}
        >
            <svg className={styles.arch} viewBox="0 0 160 200" aria-hidden="true">
                <path d="M4 196V80C4 38.6 38.6 4 80 4s76 34.6 76 76v116" fill="none" strokeWidth="1.5" />
            </svg>

            <div className={styles['header-block']}>
                <span className={styles.subtitle}>{t('contact.subtitle')}</span>
                <h2 className={styles.title}>{t('contact.title')}</h2>
            </div>

            <div className={styles['content-layout']}>
                <ContactInfo t={t} />

                <div className={styles['form-container']}>
                    {(isPending || isSuccess) && showStatus && (
                        <FormSubmissionStatus
                            isPending={isPending}
                            isSuccess={isSuccess}
                            onClose={handleCloseStatus}
                        />
                    )}

                    {isError && <div className={styles['error-banner']}>{error?.message ?? t('contact.error')}</div>}

                    <GenericForm
                        fields={contactFields}
                        submitLabel={isPending && showStatus ? t('contact.sending') : t('contact.submit')}
                        onSubmit={handleContactSubmit}
                        disabled={isPending && showStatus}
                    />
                </div>
            </div>
        </motion.section>
    );
};
