import styles from './ProjectPage.module.css';
import { useProjectById } from '../../hooks/useProjects.ts';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { ProjectHeader } from './ProjectHeader.tsx';
import { ProjectGallery } from './ProjectGallery.tsx';
import { ProjectContent } from './ProjectContent.tsx';

export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const { data: project, isLoading, error } = useProjectById(id ?? '');

    if (isLoading) {
        return <main className={styles.container}>{t('projectPage.loading')}</main>;
    }

    if (error || !project) {
        return <main className={styles.container}>{t('projectPage.notFound')}</main>;
    }

    const currentTranslation = project.translations.find(
        (trans) => trans.languageCode.toLowerCase() === i18n.language.toLowerCase()
    );

    const activeTitle = currentTranslation?.title ?? project.title;
    const activeSummary = currentTranslation?.summary ?? project.summary;

    return (
        <main className={styles.container}>
            <ProjectHeader project={project} activeTitle={activeTitle} />
            <ProjectGallery photos={project.photos ?? []} altTextPrefix={activeTitle} />
            <ProjectContent summary={activeSummary} />
        </main>
    );
};