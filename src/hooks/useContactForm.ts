import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubmitInquiry } from './useContactInquiry';
import type { InquiryRequest } from '../Types/InquiryRequest';
import type { FormField } from '../Components/GenericForm/GenericForm';

export const useContactForm = () => {
    const { t } = useTranslation();
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
            onError: () => { setShowStatus(false); }
        });
    };
    const handleCloseStatus = () => { setShowStatus(false); };
    const contactFields: FormField[] = [
        {
            id: 'fullName',
            label: t('contact.labels.name'),
            type: 'text',
            placeholder: t('contact.placeholders.name'),
            value: formData.fullName,
            onChange: (val) => { setFormData(prev => ({ ...prev, fullName: val })); },
            required: true
        },
        {
            id: 'email',
            label: t('contact.labels.email'),
            type: 'email',
            placeholder: t('contact.placeholders.email'),
            value: formData.email,
            onChange: (val) => { setFormData(prev => ({ ...prev, email: val })); },
            required: true
        },
        {
            id: 'message',
            label: t('contact.labels.message'),
            type: 'textarea',
            placeholder: t('contact.placeholders.message'),
            value: formData.message,
            onChange: (val) => { setFormData(prev => ({ ...prev, message: val })); },
            required: true,
            rows: 4
        }
    ];

    return {
        t,
        showStatus,
        isPending,
        isSuccess,
        isError,
        error,
        contactFields,
        handleContactSubmit,
        handleCloseStatus
    };
};