import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { SectionHeader } from '../../../Components/SectionHeader/SectionHeader.tsx';
import { RecentInquiriesTable } from '../Dashboard/RecentInquiry/RecentInquiriesTable.tsx';
import { DeleteConfirmToast } from '../Dashboard/DeleteConfirmToast.tsx';
import { useContactInquiries, useDeleteInquiry, useToggleInquiryRead } from '../../../hooks/useContactInquiry.ts';
import styles from './MessagesPage.module.css';

const PAGE_SIZE = 20;

export const MessagesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { data: inquiriesResponse, isLoading } = useContactInquiries(page, PAGE_SIZE);
    const { mutate: toggleInquiryRead } = useToggleInquiryRead();
    const { mutate: removeInquiry } = useDeleteInquiry();

    const totalPages = inquiriesResponse?.totalPages ?? 1;

    const handleDeleteMessage = (id: number) => {
        toast((a) => (
            <DeleteConfirmToast
                t={t}
                title={t('admin.dashboard.deleteConfirmation.messageTitle')}
                onConfirm={() => {
                    removeInquiry(id);
                    toast.dismiss(a.id); }}
                onCancel={() => { toast.dismiss(a.id); }} />
        ), {
            duration: Infinity,
        });
    };

    return (
        <div className={styles['messages-container']}>
            <SectionHeader
                title={t('admin.messages.title')}
                actionLabel={t('admin.messages.backButton')}
                onActionClick={() => { navigate('/Dashboard'); }}
            />

            <RecentInquiriesTable
                messages={inquiriesResponse?.data}
                isLoading={isLoading}
                onMessageClick={(id) => { toggleInquiryRead(id); }}
                onDeleteMessage={handleDeleteMessage}
            />

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        type="button"
                        className={styles['page-btn']}
                        onClick={() => { setPage((p) => Math.max(1, p - 1)); }}
                        disabled={page <= 1}
                    >
                        {t('admin.messages.previous')}
                    </button>

                    <span className={styles['page-status']}>
                        {t('admin.messages.pageStatus', { page, totalPages })}
                    </span>

                    <button
                        type="button"
                        className={styles['page-btn']}
                        onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); }}
                        disabled={page >= totalPages}
                    >
                        {t('admin.messages.next')}
                    </button>
                </div>
            )}
        </div>
    );
};
