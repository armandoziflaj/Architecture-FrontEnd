import { useParams, Link } from 'react-router-dom';
import styles from './ProjectPage.module.css';
import { useProjectById } from "../../hooks/useProjects.ts";
import { useTranslation } from "react-i18next";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const { data: project, isLoading, error } = useProjectById(id || '');

    if (isLoading) return <main className={styles.container}>{t('projectPage.loading')}</main>;
    if (error || !project) return <main className={styles.container}>{t('projectPage.notFound')}</main>;

    const currentTranslation = project.translations?.find(
        (trans) => trans.languageCode.toLowerCase() === i18n.language.toLowerCase()
    );

    const activeTitle = currentTranslation?.title || project.title;
    const activeSummary = currentTranslation?.summary || project.summary;

    return (
        <main className={styles.container}>
            <Link to="/" className={styles.backLink}>
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

            <section className={styles.gallery}>
                {project.photos && project.photos.map((photo, index) => {
                    const rawUrl = photo.imageUrl;
                    const fullImageUrl = rawUrl.startsWith('http')
                        ? rawUrl
                        : `${API_BASE_URL}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;

                    return (
                        <img
                            key={photo.id || index}
                            src={fullImageUrl}
                            alt={photo.altText || `${activeTitle} photo ${index + 1}`}
                            className={styles.galleryImage}
                            style={{ animationDelay: `${200 + index * 100}ms` }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                            }}
                        />
                    );
                })}
            </section>

            <div className={styles.contentWrapper}>
                <div className={styles.decoration}></div>
                <section className={styles.content}>
                    <h3>{t('projectPage.overview')}</h3>
                    <p>{activeSummary}</p>
                </section>
            </div>
        </main>
    );
};
