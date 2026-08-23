import { useProjects } from '../../hooks/useProjects';
import styles from './ProjectGrid.module.css';
import { useTranslation } from "react-i18next";
import { ProjectRow } from './ProjectRow.tsx';

export const ProjectGrid = () => {
    const { t, i18n } = useTranslation();
    const { data: projects = [], isLoading, isError, error } = useProjects(i18n.language);

    if (isLoading) return <div className={styles.loading}>{t('works.loading')}</div>;
    if (isError) return <div className={styles.error}>{t('works.error')}: {error.message || 'Something went wrong'}</div>;

    return (
        <section className={styles.section} id="works">
            <div className={styles['grid-header']}>
                <h2 className={styles.title}>{t('works.title')}</h2>
                <span className={styles.count}>01 — {String(projects.length).padStart(2, '0')}</span>
            </div>

            <div className={styles.list}>
                {projects.map((project, index) => (
                    <ProjectRow key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};
