import React from 'react';
import styles from './ProjectManagement.module.css';

interface LanguageTabsProps {
    activeLang: 'el' | 'en';
    onSelectLanguage: (lang: 'el' | 'en') => void;
}

export const LanguageTabs: React.FC<LanguageTabsProps> = ({ activeLang, onSelectLanguage }) => {
    return (
        <div className={styles.tabsWrapper}>
            <button
                type="button"
                className={`${styles.tabLink} ${activeLang === 'en' ? styles.tabLinkActive : ''}`}
                onClick={() => onSelectLanguage('en')}
            >
                English Database
            </button>

            <button
                type="button"
                className={`${styles.tabLink} ${activeLang === 'el' ? styles.tabLinkActive : ''}`}
                onClick={() => onSelectLanguage('el')}
            >
                Ελληνική Βάση
            </button>
        </div>
    );
};