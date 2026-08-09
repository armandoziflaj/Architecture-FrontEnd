import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import styles from './Contact.module.css';
import { type FormField, GenericForm } from "../GenericForm/GenericForm.tsx";
import type { InquiryRequest } from "../../Types/InquiryRequest.ts";
import { useSubmitInquiry } from "../../hooks/useContactInquiry.ts";
import { useInViewAnimation } from "../../hooks/useInViewAnimation.ts";
import { FormSubmissionStatus } from '../FormSubmissionStatus/FormSubmissionStatus.tsx';

export const Contact = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInViewAnimation();
    const [showStatus, setShowStatus] = useState(false);

    const [formData, setFormData] = useState<InquiryRequest>({
        fullName: '',
        email: '',
        message: '',
        phoneNumber: ''
    });

    const { mutate, isPending, isError, error, isSuccess } = useSubmitInquiry();

    const handleContactSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setShowStatus(true);
        mutate(formData, {
            onSuccess: () => {
                setFormData({ fullName: '', email: '', message: '', phoneNumber: '' });
            },
            onError: () => {
                setShowStatus(false); 
            }
        });
    };

    const handleCloseStatus = () => {
        setShowStatus(false);
    };

    const contactFields: FormField[] = [
        {
            id: 'fullName',
            label: t('contact.labels.name'),
            type: 'text',
            placeholder: t('contact.placeholders.name'),
            value: formData.fullName,
            onChange: (val) => setFormData(prev => ({ ...prev, fullName: val })),
            required: true
        },
        {
            id: 'email',
            label: t('contact.labels.email'),
            type: 'email',
            placeholder: t('contact.placeholders.email'),
            value: formData.email,
            onChange: (val) => setFormData(prev => ({ ...prev, email: val })),
            required: true
        },
        {
            id: 'message',
            label: t('contact.labels.message'),
            type: 'textarea',
            placeholder: t('contact.placeholders.message'),
            value: formData.message,
            onChange: (val) => setFormData(prev => ({ ...prev, message: val })),
            required: true,
            rows: 4
        }
    ];

    return (
        <section 
            ref={ref} 
            className={styles.section} 
            id="contact"
            data-inview={inView}
        >
            <div className={styles.headerBlock}>
                <span className={styles.subtitle}>{t('contact.subtitle')}</span>
                <h2 className={styles.title}>{t('contact.title')}</h2>
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.infoColumn}>
                    <div className={styles.infoGroup}>
                        <h4>{t('contact.general')}</h4>
                        <p>
                            <a href="mailto:hello@example.com" className={styles.link}>
                                hello@example.com
                            </a>
                        </p>
                        <p>+30 210 000 0000</p>
                    </div>

                    <div className={styles.infoGroup}>
                        <h4>{t('contact.address')}</h4>
                        <p>{t('contact.street')}</p>
                        <p>{t('contact.city')}</p>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    {(isPending || isSuccess) && showStatus && (
                        <FormSubmissionStatus 
                            isPending={isPending}
                            isSuccess={isSuccess}
                            onClose={handleCloseStatus}
                        />
                    )}

                    {isError && !isPending && <div className={styles.errorBanner}>{error?.message || t('contact.error')}</div>}

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