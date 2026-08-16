import React, { useState } from 'react';
import styles from './GenericForm.module.css';

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'textarea';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    rows?: number;
}

interface FormProps {
    fields: FormField[];
    submitLabel: string;
    onSubmit: (e: React.SubmitEvent) => void;
    disabled?: boolean;
}

export const GenericForm = ({ fields, submitLabel, onSubmit, disabled = false }: FormProps) => {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleValidation = (e: React.SubmitEvent) => {
        e.preventDefault();
        const errors: string[] = [];
        fields.forEach(field => {
            if (field.required && !field.value.trim()) {
                errors.push(field.id);
            }
        });

        setValidationErrors(errors);

        if (errors.length === 0) {
            onSubmit(e);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleValidation} noValidate>
            {fields.map((field) => (
                <div key={field.id} className={styles['input-group']}>
                    <label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className={styles['required-asterisk']}>*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.id}
                            rows={field.rows ?? 4}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                if (validationErrors.includes(field.id)) {
                                    setValidationErrors(errors => errors.filter(err => err !== field.id));
                                }
                            }}
                            disabled={disabled}
                            className={validationErrors.includes(field.id) ? styles.error : ''}
                        />
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                if (validationErrors.includes(field.id)) {
                                    setValidationErrors(errors => errors.filter(err => err !== field.id));
                                }
                            }}
                            disabled={disabled}
                            className={validationErrors.includes(field.id) ? styles.error : ''}
                        />
                    )}
                </div>
            ))}
            {submitLabel &&
                <button type="submit" className={styles['submit-btn']} disabled={disabled}>
                    {submitLabel}
                </button>}
        </form>
    );
};