import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Login.module.css';
import {useAuth} from "../../hooks/useAuth.ts";
import {GenericForm, type FormField} from "../../Components/GenericForm/GenericForm.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import { fadeUp } from "../../animations/variants.ts";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { t } = useTranslation();
    const { login, isLoggingIn } = useAuth();
    const navigate = useNavigate();

    const loginFields: FormField[] = [
        { id: 'username', label: t('admin.login.usernameLabel'), type: 'text', placeholder: t('admin.login.usernamePlaceholder'), value: username, onChange: setUsername, required: true },
        { id: 'password', label: t('admin.login.passwordLabel'), type: 'password', placeholder: t('admin.login.passwordPlaceholder'), value: password, onChange: setPassword, required: true }
    ];

    const handleLoginSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const response = await login({ username, password });
            if (response.success) navigate('/dashboard');
            else setErrorMsg(response.message || t('admin.login.invalidCredentials'));
        } catch {
            setErrorMsg(t('admin.login.genericError'));
        }
    };

    return (
        <div className={styles['login-page-container']}>
            <motion.div
                className={styles['form-wrapper']}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <div className={styles['header-group']}>
                    <h2 className={styles.title}>{t('admin.login.title')}</h2>
                    <span className={styles.subtitle}>{t('admin.login.subtitle')}</span>
                </div>

                {errorMsg && <div className={styles['error-banner']}>{errorMsg}</div>}

                <GenericForm
                    fields={loginFields}
                    submitLabel={isLoggingIn ? t('admin.login.verifying') : t('admin.login.loginButton')}
                    onSubmit={handleLoginSubmit}
                    disabled={isLoggingIn}
                />
            </motion.div>
        </div>
    );
};