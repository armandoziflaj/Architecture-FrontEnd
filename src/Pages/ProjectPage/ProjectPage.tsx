import styles from './ProjectPage.module.css';
import { useProjectById } from '../../hooks/useProjects.ts';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { ProjectHero } from './ProjectHero.tsx';
import { ProjectGallery } from './ProjectGallery.tsx';
import { ProjectContent } from './ProjectContent.tsx';
import type { ProjectDetailedResponse } from '../../Types/ProjectResponse.ts';

const resolveActiveContent = (project: ProjectDetailedResponse, lang: string) => {
    const currentTranslation = project.translations.find(
        (trans) => trans.languageCode.toLowerCase() === lang.toLowerCase()
    );

    return {
        activeTitle: currentTranslation?.title ?? project.title,
        activeSummary: currentTranslation?.summary ?? project.summary,
    };
};

export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const { data: project, isLoading, error } = useProjectById(id ?? '');

    if (isLoading) {
        return <main className={styles.container}>{t('projectPage.loading')}</main>;
    }

    if (error ?? !project) {
        return <main className={styles.container}>{t('projectPage.notFound')}</main>;
    }

    const { activeTitle, activeSummary } = resolveActiveContent(project, i18n.language);
    const coverPhoto = project.photos.at(0);
    const galleryPhotos = coverPhoto ? project.photos.slice(1) : project.photos;

    return (
        <main className={styles.container}>
            <ProjectHero project={project} activeTitle={activeTitle} coverPhoto={coverPhoto} />
            <ProjectGallery photos={galleryPhotos} altTextPrefix={activeTitle} />
            <ProjectContent summary={activeSummary} />
        </main>
    );
};
