import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDeleteProject, useProjects } from '../../../hooks/useProjects.ts';
import { MetricCard } from '../../../Components/MetricCard/MetricCard.tsx';
import { SectionHeader } from '../../../Components/SectionHeader/SectionHeader.tsx';
import styles from './Dashboard.module.css';
import { ProjectPreviewGrid } from "./ProjectPreviewGrid/ProjectPreviewGrid.tsx";
import { RecentInquiriesTable } from "./RecentInquiry/RecentInquiriesTable.tsx";
import { useContactInquiries, useToggleInquiryRead, useVisitorCount } from "../../../hooks/useContactInquiry.ts";
import { toast } from "react-hot-toast";

const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return '...';
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
};

export const Dashboard = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const { data: projects, isLoading: isProjectsLoading } = useProjects(i18n.language);
    const { data: inquiries, isLoading: isInquiriesLoading } = useContactInquiries();
    const { data: visitorCountData, isLoading: isVisitorCountLoading } = useVisitorCount();
    const { mutate: removeProject } = useDeleteProject();
    const { mutate: toggleInquiryRead } = useToggleInquiryRead();

    const handleEditProject = (id: number) => {
        navigate(`/admin/projects?edit=${id}`);
    };

    const handleDeleteProject = (id: number) => {
        toast((t) => (
            <span>
                Are you sure you want to delete this project?
                <button
                    style={{ marginLeft: '10px', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '5px' }}
                    onClick={() => {
                        removeProject(id);
                        toast.dismiss(t.id);
                    }}
                >
                    Yes
                </button>
                <button
                    style={{ marginLeft: '10px', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '5px' }}
                    onClick={() => toast.dismiss(t.id)}
                >
                    No
                </button>
            </span>
        ), {
            duration: Infinity,
        });
    };

    const unreadInquiries = inquiries?.filter(inquiry => !inquiry.isRead).length ?? 0;

    const stats = [
        { id: '01', label: 'Active Projects', value: isProjectsLoading ? '...' : projects?.length ?? 0 },
        { id: '02', label: 'Unread Inquiries', value: isInquiriesLoading ? '...' : unreadInquiries },
        { id: '03', label: 'Total Views', value: isVisitorCountLoading ? '...' : formatNumber(visitorCountData!.data.count) },
    ];

    return (
        <div className={styles.dashboardContainer}>

            <header className={styles.headerBlock}>
                <span className={styles.subtitle}>01 — Overview</span>
                <h1 className={styles.title}>System Dashboard</h1>
            </header>

            <section className={styles.metricsGrid}>
                {stats.map((stat) => (
                    <MetricCard
                        key={stat.id}
                        id={stat.id}
                        label={stat.label}
                        value={String(stat.value)}
                    />
                ))}
            </section>

            <section className={styles.sectionWrapper}>
                <SectionHeader
                    title="Recent Inquiries"
                    actionLabel="View All Messages ↗"
                    onActionClick={() => navigate('/admin/messages')}
                />
                <RecentInquiriesTable
                    messages={inquiries}
                    isLoading={isInquiriesLoading}
                    onMessageClick={(id) => toggleInquiryRead(id)}
                />
            </section>

            <section className={styles.sectionWrapper}>
                <SectionHeader
                    title="Active Architectural Projects"
                    actionLabel="+ Manage Frameworks ↗"
                    onActionClick={() => navigate('/admin/projects')}
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
