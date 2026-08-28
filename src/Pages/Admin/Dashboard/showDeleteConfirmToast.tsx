import type { TFunction } from 'i18next';
import { toast } from 'react-hot-toast';
import { DeleteConfirmToast } from './DeleteConfirmToast.tsx';


export const showDeleteConfirmToast = (t: TFunction, onConfirm: () => void, title?: string) => {
    toast((a) => (
        <DeleteConfirmToast
            t={t}
            title={title}
            onConfirm={() => {
                onConfirm();
                toast.dismiss(a.id);
            }}
            onCancel={() => { toast.dismiss(a.id); }}
        />
    ), {
        duration: Infinity,
    });
};
