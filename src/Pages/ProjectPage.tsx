import { useParams, Link } from 'react-router-dom';
import styles from './ProjectPage.module.css';
import { useProjectById } from "../hooks/useProjects.ts";
import { useTranslation } from "react-i18next";

export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const { data: project, isLoading, error } = useProjectById(id || '', i18n.language);

    if (isLoading) return <main className={styles.container}>{t('projectPage.loading')}</main>;
    if (error || !project) return <main className={styles.container}>{t('projectPage.notFound')}</main>;

    return (
        <main className={styles.container}>
            <Link to="/" className={styles.backLink}>← {t('projectPage.back')}</Link>

            <header className={styles.header}>
                <h1>{project.title}</h1>
                <div className={styles.meta}>
                    <span>{t('projectPage.meta.location')}: {project.location}</span>
                    <span>{t('projectPage.meta.year')}: {project.completionYear}</span>
                    <span>{t('projectPage.meta.size')}: {project.size} m²</span>
                </div>
            </header>

            <section className={styles.gallery}>
                {project.photos && project.photos.map((photo, index) => (
                    <img
                        key={index}
                        src={`http://localhost:5188${photo.imageUrl}`}
                        alt={photo.altText || `Project photo ${index + 1}`}
                        className={styles.galleryImage}
                    />
                ))}
            </section>

            <section className={styles.content}>
                <h3 className={styles.overviewTitle}>{t('projectPage.overview')}</h3>
                <p className={styles.text}>
                    {project.summary}
                </p>
            </section>
        </main>
    );
};