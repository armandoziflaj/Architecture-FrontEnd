import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../Dashboard.module.css';
import type {ProjectResponse} from "../../../../Types/ProjectResponse.ts";
import { Link } from "react-router";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProjectPreviewGridProps {
    projects?: ProjectResponse[];
    isLoading: boolean;
    onEditProject: (_id: number) => void;
    onDeleteProject: (_id: number) => void;
    apiBaseUrl?: string;
}

export const ProjectPreviewGrid: React.FC<ProjectPreviewGridProps> = ({
                                                                          projects,
                                                                          isLoading,
                                                                          onEditProject,
                                                                          onDeleteProject,
                                                                          apiBaseUrl = API_BASE_URL,
                                                                      }) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <div className={styles['loading-text']}>{t('admin.dashboard.projectPreview.loading')}</div>;
    }

    return (
        <div className={styles['project-grid']}>
            {projects?.slice(0, 3).map((project) => {
                const rawPath = project.photos[0]?.imageUrl;
                const fullImageUrl = rawPath
                    ? `${apiBaseUrl}${rawPath.startsWith('/') ? rawPath : `/${rawPath}`}`
                    : '/placeholder.jpg';

                return (
                    <div key={project.id} className={styles['project-card']}>
                        <div className={styles['image-container']}>
                            <img
                                src={fullImageUrl}
                                alt={project.title}
                                className={styles['card-image']}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                }}
                            />

                            <Link
                                to={`/project/${project.id}`}
                                className={styles['view-project-overlay']}
                            >
                                <span>{t('works.viewProject')} ↗</span>
                            </Link>
                        </div>

                        <div className={styles['card-body']}>
                            <h4 className={styles['project-title']}>{project.title}</h4>
                            <p className={styles['project-meta']}>
                                {project.location} • {project.completionYear}
                            </p>
                        </div>

                        <div className={styles['card-footer']}>
                            <button
                                type="button"
                                onClick={() => onEditProject(project.id)}
                                className={styles['edit-btn']}
                            >
                                {t('admin.dashboard.projectPreview.edit')}
                            </button>

                            <button
                                type="button"
                                onClick={() => onDeleteProject(project.id)}
                                className={styles['edit-btn']}
                            >
                                {t('admin.dashboard.projectPreview.delete')}
                            </button>
                    </div>
                    </div>
                );
            })}
        </div>
    );
};