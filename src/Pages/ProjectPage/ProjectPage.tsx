import { useParams, Link } from 'react-router-dom';
import styles from './ProjectPage.module.css';
import { useProjectById } from "../../hooks/useProjects.ts";
import { useTranslation } from "react-i18next";

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
            <Link to="/" className={styles.backLink}>← {t('projectPage.back')}</Link>

            <header className={styles.header}>
                <h1>{activeTitle}</h1>
                <div className={styles.meta}>
                    <span>{t('projectPage.meta.location')}: {project.location}</span>
                    <span>{t('projectPage.meta.year')}: {project.completionYear}</span>
                    <span>{t('projectPage.meta.size')}: {project.size} m²</span>
                </div>
            </header>

            <section className={styles.gallery}>
                {project.photos && project.photos.map((photo, index) => {
                    const rawUrl = photo.imageUrl;
                    const fullImageUrl = rawUrl.startsWith('http')
                        ? rawUrl
                        : `http://localhost:5188${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;

                    return (
                        <img
                            key={photo.id || index}
                            src={fullImageUrl}
                            alt={photo.altText || `${activeTitle} photo ${index + 1}`}
                            className={styles.galleryImage}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                            }}
                        />
                    );
                })}
            </section>

            <section className={styles.content}>
                <h3 className={styles.overviewTitle}>{t('projectPage.overview')}</h3>
                <p className={styles.text}>
                    {activeSummary}
                </p>
            </section>
        </main>
    );
};