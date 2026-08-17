import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { SectionHeader } from '../../../Components/SectionHeader/SectionHeader';
import { useProjectById } from '../../../hooks/useProjects';
import { useProjectForm } from './useProjectFormState';
import { ProjectForm } from './ProjectForm';
import styles from './ProjectManagement.module.css';

export const ProjectManagement = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const editIdParam = searchParams.get('edit');
    const activeProjectId = editIdParam ? Number(editIdParam) : null;
    const isEditMode = Boolean(activeProjectId);
    const navigate = useNavigate();
    const { data: existingProject, isLoading: isLoadingProject } = useProjectById(activeProjectId?.toString() ?? '');

    const {
        t,
        isPending,
        activeLang,
        setActiveLang,
        images,
        setImages,
        projectFields,
        handleFormSubmit,
        resetForm,
    } = useProjectForm(isEditMode, activeProjectId, existingProject);

    const [isFormOpen, setIsFormOpen] = useState(true);

    const handleToggleForm = () => {
        if (isFormOpen) {
            setIsFormOpen(false);
            navigate('/Dashboard');
        } else {
            resetForm();
            setSearchParams({});
            setIsFormOpen(true);
        }
    };

    if (isLoadingProject) {
        return <div className={styles['loading-text']}>{t('admin.projectManagement.loading')}</div>;
    }

    const getSectionHeaderText = () => {
        return isEditMode
            ? t('admin.projectManagement.editTitle', { id: activeProjectId })
            : t('admin.projectManagement.createTitle');
    };

    return (
        <div className={styles['management-container']}>
            <SectionHeader
                title={getSectionHeaderText()}
                actionLabel={isFormOpen ? t('admin.projectManagement.backButton') : t('admin.projectManagement.newButton')}
                onActionClick={handleToggleForm}
            />

            {isFormOpen && (
                <ProjectForm
                    t={t}
                    language={{ activeLang, onSelectLanguage: setActiveLang }}
                    media={{ images, onImagesChange: setImages }}
                    handleFormSubmit={handleFormSubmit}
                    projectFields={projectFields}
                    isPending={isPending}
                    isEditMode={isEditMode}
                />
            )}
        </div>
    );
};