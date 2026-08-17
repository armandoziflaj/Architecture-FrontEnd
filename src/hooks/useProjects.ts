import type {ProjectDetailedResponse, ProjectResponse} from "../Types/ProjectResponse.ts";
import {createProject, deleteProject, fetchProjectById, fetchProjects, updateProject} from "../api/projectsApi.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {isAxiosError} from "axios";
import { useTranslation } from "react-i18next";

export const useProjects = (lang: string) => {
    return useQuery<ProjectResponse[]>({
        queryKey: ['projects', lang],
        queryFn: async ({ signal }) => {
            const result = await fetchProjects(signal);
            if (result.success) {
                return result.data;
            }
            throw new Error(result.message || "Failed to load projects.");
        }
    });
};

export const useProjectById = (id: string) => {
    return useQuery<ProjectDetailedResponse>({
        queryKey: ['project', id],
        queryFn: async ({ signal }) => {
            const result = await fetchProjectById(id, signal);
            if (result.success) {
                return result.data;
            }
            throw new Error(result.message || "Project not found.");
        },
        enabled: !!id,
        retry: (failureCount, error) => {
            if (isAxiosError(error) && error.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        }
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (newProject: FormData) =>
            toast.promise(createProject(newProject), {
                loading: t('toasts.creatingProject'),
                success: t('toasts.createSuccess'),
                error: (err) => err.message || t('toasts.createError'),
            }),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (updatedProject: FormData) =>
            toast.promise(updateProject(updatedProject), {
                loading: t('toasts.updatingProject'),
                success: t('toasts.updateSuccess'),
                error: (err) => err.message || t('toasts.updateError'),
            }),
        onSuccess: (_, variables) => {
            const projectData = JSON.parse(variables.get('projectData') as string);
            return queryClient.invalidateQueries({ queryKey: ['project', String(projectData.id)] });
        }
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (id: number) =>
            toast.promise(deleteProject(id), {
                loading: t('toasts.deletingProject'),
                success: t('toasts.deleteSuccess'),
                error: (err) => err.message || t('toasts.deleteError'),
            }),
        onSuccess: (_, deletedId) => {
            queryClient.removeQueries({ queryKey: ['project', String(deletedId)] });
            return queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};