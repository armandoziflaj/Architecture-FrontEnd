import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useDeleteProject, useProjects} from '../../../hooks/useProjects.ts';
import { MetricCard } from '../../../Components/MetricCard/MetricCard.tsx';
import { SectionHeader } from '../../../Components/SectionHeader/SectionHeader.tsx';
import type { MessageData } from '../../../Types/IndexRow.ts';
import styles from './Dashboard.module.css';
import {ProjectPreviewGrid} from "./ProjectPreviewGrid/ProjectPreviewGrid.tsx";
import {RecentInquiriesTable} from "./RecentInquiry/RecentInquiriesTable.tsx";

const mockStats = [
    { id: '01', label: 'Active Projects', value: '12' },
    { id: '02', label: 'Unread Inquiries', value: '4' },
    { id: '03', label: 'Total Views', value: '1.2k' },
];

const mockRecentMessages: MessageData[] = [
    {
        id: '1',
        name: 'Γιώργος Νικολάου',
        email: 'g.nikolaou@example.com',
        subject: 'Residential Project in Voula',
        date: 'Today, 14:20',
        unread: true
    },
    {
        id: '2',
        name: 'Elena Rostova',
        email: 'elena@studio-design.com',
        subject: 'Collaboration Inquiry',
        date: 'Yesterday',
        unread: false
    },
    {
        id: '3',
        name: 'Δημήτρης Παπάς',
        email: 'd.papas@cleanlines.gr',
        subject: 'Summer House Symi',
        date: '12 July 2026',
        unread: false
    }
];

export const Dashboard = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const { data: projects, isLoading: isProjectsLoading } = useProjects(i18n.language);
    const { mutate: removeProject } = useDeleteProject();

    const handleEditProject = (id: number) => {
        navigate(`/admin/projects?edit=${id}`);
    };

    const handleDeleteProject = (id: number) => {
        if (window.confirm("Are you sure you want to delete this structure framework?")) {
            removeProject(id, {
                onSuccess: () => {
                    alert("Project deleted successfully.");
                }
            });
        }
    };

    return (
        <div className={styles.dashboardContainer}>

            <header className={styles.headerBlock}>
                <span className={styles.subtitle}>01 — Overview</span>
                <h1 className={styles.title}>System Dashboard</h1>
            </header>

            <section className={styles.metricsGrid}>
                {mockStats.map((stat) => (
                    <MetricCard
                        key={stat.id}
                        id={stat.id}
                        label={stat.label}
                        value={stat.value}
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
                    messages={mockRecentMessages}
                    onMessageClick={(id) => navigate(`/admin/messages?id=${id}`)}
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