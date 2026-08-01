import { useState } from 'react';
import { useTranslation } from "react-i18next";
import styles from './Contact.module.css';
import { type FormField, GenericForm } from "../GenericForm/GenericForm.tsx";
import type { InquiryRequest } from "../../Types/InquiryRequest.ts";
import { useSubmitContactInquiry } from "../../hooks/useContactInquiry.ts";

export const Contact = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<InquiryRequest>({
        fullName: '',
        email: '',
        message: '',
        phoneNumber: ''
    });

    const { mutate, isPending, isError, error, isSuccess } = useSubmitContactInquiry();

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutate(formData, {
            onSuccess: () => {
                setFormData({ fullName: '', email: '', message: '', phoneNumber: '' });
            }
        });
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
        <section className={styles.section} id="contact">
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
                    {isSuccess && <div className={styles.successBanner}>Inquiry sent successfully.</div>}
                    {isError && <div className={styles.errorBanner}>{error?.message || "An error occurred."}</div>}

                    <GenericForm
                        fields={contactFields}
                        submitLabel={isPending ? 'Sending...' : t('contact.submit')}
                        onSubmit={handleContactSubmit}
                        disabled={isPending}
                    />
                </div>
            </div>
        </section>
    );
};