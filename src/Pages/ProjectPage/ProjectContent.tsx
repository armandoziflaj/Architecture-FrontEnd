import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProjectPage.module.css';

interface ProjectContentProps {
    summary: string;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({ summary }) => {
    const { t } = useTranslation();

    return (
        <div className={styles['content-wrapper']}>
            <div className={styles.decoration}></div>
            <section className={styles.content}>
                <h3>{t('projectPage.overview')}</h3>
                <p>{summary}</p>
            </section>
        </div>
    );
};