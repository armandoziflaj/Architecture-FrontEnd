import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import styles from './ProjectPage.module.css';
import type { ProjectDetailedResponse as Project } from '../../Types/ProjectResponse';

interface ProjectHeaderProps {
    project: Project;
    activeTitle: string;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, activeTitle }) => {
    const { t } = useTranslation();

    return (
        <>
            <Link to="/" className={styles['back-link']}>
                <span>←</span>
                <span>{t('projectPage.back')}</span>
            </Link>
            <header className={styles.header}>
                <h1>{activeTitle}</h1>
                <div className={styles.meta}>
                    <span>{project.location}</span>
                    <span>{project.completionYear}</span>
                    <span>{project.size} m²</span>
                </div>
            </header>
        </>
    );
};