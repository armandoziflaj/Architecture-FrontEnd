import React from 'react';
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
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {fields.map((field) => (
                <div key={field.id} className={styles.inputGroup}>
                    <label htmlFor={field.id}>{field.label}</label>

                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.id}
                            rows={field.rows || 4}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={disabled}
                        />
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={disabled}
                        />
                    ) }
                </div>
            ))}
            {submitLabel &&
                <button type="submit" className={styles.submitBtn} disabled={disabled}>
                    {submitLabel}
                </button> }
        </form>
    );
};