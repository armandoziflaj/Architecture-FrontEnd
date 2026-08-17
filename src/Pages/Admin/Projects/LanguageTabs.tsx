import React from 'react';
import styles from './ProjectManagement.module.css';

interface LanguageTabsProps {
    activeLang: 'el' | 'en';
    onSelectLanguage: (lang: 'el' | 'en') => void;
}

export const LanguageTabs: React.FC<LanguageTabsProps> = ({ activeLang, onSelectLanguage }) => {
    return (
        <div className={styles['tabs-wrapper']}>
            <button
                type="button"
                className={`${styles['tab-link']} ${activeLang === 'en' ? styles['tab-link-active'] : ''}`}
                onClick={() => onSelectLanguage('en')}
            >
                English Database
            </button>

            <button
                type="button"
                className={`${styles['tab-link']} ${activeLang === 'el' ? styles['tab-link-active'] : ''}`}
                onClick={() => onSelectLanguage('el')}
            >
                Ελληνική Βάση
            </button>
        </div>
    );
};