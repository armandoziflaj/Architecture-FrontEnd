import { useTranslation } from 'react-i18next';
import { useDeleteProject, useProjects } from '../../../hooks/useProjects.ts';
import { MetricCard } from '../../../Components/MetricCard/MetricCard.tsx';
import { SectionHeader } from '../../../Components/SectionHeader/SectionHeader.tsx';
import styles from './Dashboard.module.css';
import { ProjectPreviewGrid } from "./ProjectPreviewGrid/ProjectPreviewGrid.tsx";
import { RecentInquiriesTable } from "./RecentInquiry/RecentInquiriesTable.tsx";
import { DeleteConfirmToast } from "./DeleteConfirmToast.tsx";
import { useContactInquiries, useDeleteInquiry, useToggleInquiryRead, useVisitorCount } from "../../../hooks/useContactInquiry.ts";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router";

const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return '...';
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
};

export const Dashboard = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const { data: projects, isLoading: isProjectsLoading } = useProjects(i18n.language, false);
    const { data: inquiriesResponse, isLoading: isInquiriesLoading } = useContactInquiries(1, 8, true);
    const { data: visitorCountData, isLoading: isVisitorCountLoading } = useVisitorCount();
    const { mutate: removeProject } = useDeleteProject();
    const { mutate: toggleInquiryRead } = useToggleInquiryRead();
    const { mutate: removeInquiry } = useDeleteInquiry();

    const handleEditProject = (id: number) => {
        navigate(`/admin/projects?edit=${id}`);
    };

    const handleDeleteProject = (id: number) => {
        toast((a) => (
            <DeleteConfirmToast
                t={t}
                onConfirm={() => {
                    removeProject(id);
                    toast.dismiss(a.id); }}
                onCancel={() => { toast.dismiss(a.id); }} />
        ), {
            duration: Infinity,
        });
    };

    const handleDeleteMessage = (id: number) => {
        toast((a) => (
            <DeleteConfirmToast
                t={t}
                title={t('admin.dashboard.deleteConfirmation.messageTitle')}
                onConfirm={() => {
                    removeInquiry(id);
                    toast.dismiss(a.id); }}
                onCancel={() => { toast.dismiss(a.id); }} />
        ), { duration: Infinity, }); };

    const stats = [
        { id: '01', labelKey: 'admin.dashboard.activeProjects', value: isProjectsLoading ? '...' : projects?.length ?? 0 },
        { id: '02', labelKey: 'admin.dashboard.unreadInquiries', value: isInquiriesLoading ? '...' : inquiriesResponse?.totalCount ?? 0 },
        { id: '03', labelKey: 'admin.dashboard.totalViews', value: isVisitorCountLoading ? '...' : formatNumber(visitorCountData?.data.count) },
    ];

    return (
        <div className={styles['dashboard-container']}>

            <header className={styles['header-block']}>
                <span className={styles.subtitle}>{t('admin.dashboard.subtitle')}</span>
                <h1 className={styles.title}>{t('admin.dashboard.title')}</h1>
            </header>

            <section className={styles['metrics-grid']}>
                {stats.map((stat) => (
                    <MetricCard
                        key={stat.id}
                        id={stat.id}
                        label={t(stat.labelKey)}
                        value={String(stat.value)}
                    />
                ))}
            </section>

            <section className={styles['section-wrapper']}>
                <SectionHeader
                    title={t('admin.dashboard.unreadInquiries')}
                    actionLabel={t('admin.dashboard.viewAllMessages')}
                    onActionClick={() => { navigate('/admin/messages'); }}
                />
                <RecentInquiriesTable
                    messages={inquiriesResponse?.data}
                    isLoading={isInquiriesLoading}
                    onMessageClick={(id) => { toggleInquiryRead(id); }}
                    onDeleteMessage={handleDeleteMessage}
                    emptyTextKey="admin.dashboard.inquiries.emptyUnread"
                    showStatus={false}
                />
            </section>

            <section className={styles['section-wrapper']}>
                <SectionHeader
                    title={t('admin.dashboard.activeProjectsTitle')}
                    actionLabel={t('admin.dashboard.manageFrameworks')}
                    onActionClick={() => { navigate('/admin/projects'); }}
                />

                <ProjectPreviewGrid
                    projects={projects}
                    isLoading={isProjectsLoading}
                    onEditProject={handleEditProject}
                    onDeleteProject={handleDeleteProject}
                />

            </section>
        </div>
    );
};