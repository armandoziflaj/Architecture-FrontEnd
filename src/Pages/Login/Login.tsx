import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import {useAuth} from "../../hooks/useAuth.ts";
import {GenericForm, type FormField} from "../../Components/GenericForm/GenericForm.tsx";
import {useTranslation} from "react-i18next";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { t } = useTranslation();
    const { login, isLoggingIn } = useAuth();
    const navigate = useNavigate();

    const loginFields: FormField[] = [
        { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter admin username', value: username, onChange: setUsername, required: true },
        { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter secret password', value: password, onChange: setPassword, required: true }
    ];

    const handleLoginSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const response = await login({ username, password });
            if (response.success) navigate('/dashboard');
            else setErrorMsg(response.message || 'Invalid credentials.');
        } catch {
            setErrorMsg('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.formWrapper}>
                <div className={styles.headerGroup}>
                    <h2 className={styles.title}>{t('admin.login.title')}</h2>
                    <span className={styles.subtitle}>{t('admin.login.subtitle')}</span>
                </div>

                {errorMsg && <div className={styles.errorBanner}>{errorMsg}</div>}

                <GenericForm
                    fields={loginFields}
                    submitLabel={isLoggingIn ? 'Verifying...' : t('admin.login.loginButton')+''}
                    onSubmit={handleLoginSubmit}
                    disabled={isLoggingIn}
                />
            </div>
        </div>
    );
};