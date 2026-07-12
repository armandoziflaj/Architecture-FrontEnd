import { useProjects } from '../../hooks/useProjects';
import styles from './ProjectGrid.module.css';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ProjectGrid = () => {
    const { t, i18n } = useTranslation();
    const { data: projects = [], isLoading, isError, error } = useProjects(i18n.language);

    // Χρήση του t() για τα loading και error states
    if (isLoading) return <div className={styles.loading}>{t('works.loading')}</div>;
    if (isError) return <div className={styles.error}>{t('works.error')}: {error?.message || 'Something went wrong'}</div>;

    return (
        <section className={styles.section} id="works">
            <div className={styles.gridHeader}>
                <h2 className={styles.title}>{t('works.title')}</h2>
                <span className={styles.count}>01 — {String(projects.length).padStart(2, '0')}</span>
            </div>

            <div className={styles.grid}>
                {projects.map((project) => {
                    const coverPhoto = project.photos && project.photos.length > 0 ? project.photos[0] : null;

                    return (
                        <div key={project.id} className={styles.card}>
                            <div
                                className={styles.imagePlaceholder}
                                style={{
                                    backgroundImage: coverPhoto ? `url(http://localhost:5188${coverPhoto.imageUrl})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                title={coverPhoto?.altText || project.title}
                            >
                                <Link to={`/project/${project.id}`} className={styles.viewProjectLink}>
                                    <div className={styles.overlay}>
                                        {t('works.viewProject')} ↗
                                    </div>
                                </Link>
                            </div>

                            <div className={styles.meta}>
                                <div className={styles.titleGroup}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectSummary}>{project.summary}</p>
                                    <p className={styles.projectLocation}>{project.location}</p>
                                </div>

                                <div className={styles.detailsGroup}>
                                    {project.completionYear && <span className={styles.projectYear}>{project.completionYear}</span>}
                                    <span className={styles.projectSize}>{project.size} m²</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};