import React from 'react';
import styles from '../Dashboard.module.css';
import type {ProjectResponse} from "../../../../Types/ProjectResponse.ts";
import { Link } from "react-router";

interface ProjectPreviewGridProps {
    projects?: ProjectResponse[];
    isLoading: boolean;
    onEditProject: (id: number) => void;
    onDeleteProject: (id: number) => void;
    apiBaseUrl?: string;
}

export const ProjectPreviewGrid: React.FC<ProjectPreviewGridProps> = ({
                                                                          projects,
                                                                          isLoading,
                                                                          onEditProject,
                                                                          onDeleteProject,
                                                                          apiBaseUrl = 'http://localhost:5188'
                                                                      }) => {
    if (isLoading) {
        return <div className={styles.loadingText}>Loading project portfolio...</div>;
    }

    return (
        <div className={styles.projectGrid}>
            {projects?.slice(0, 3).map((project) => {
                const rawPath = project.photos[0]?.imageUrl;
                const fullImageUrl = rawPath
                    ? `${apiBaseUrl}${rawPath.startsWith('/') ? rawPath : `/${rawPath}`}`
                    : '/placeholder.jpg';

                return (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.imageContainer}>
                            <img
                                src={fullImageUrl}
                                alt={project.title}
                                className={styles.cardImage}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                }}
                            />

                            <Link
                                to={`/project/${project.id}`}
                                className={styles.viewProjectOverlay}
                            >
                                <span>View Project ↗</span>
                            </Link>
                        </div>

                        <div className={styles.cardBody}>
                            <h4 className={styles.projectTitle}>{project.title}</h4>
                            <p className={styles.projectMeta}>
                                {project.location} • {project.completionYear}
                            </p>
                        </div>

                        <div className={styles.cardFooter}>
                            <button
                                type="button"
                                onClick={() => onEditProject(project.id)}
                                className={styles.editBtn}
                            >
                                Edit Structure ↗
                            </button>

                            <button
                                type="button"
                                onClick={() => onDeleteProject(project.id)}
                                className={styles.deleteBtn || styles.editBtn}
                            >
                                Delete
                            </button>
                    </div>
                    </div>
                );
            })}
        </div>
    );
};