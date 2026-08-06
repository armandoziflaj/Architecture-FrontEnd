import type {ProjectDetailedResponse, ProjectResponse} from "../Types/ProjectResponse.ts";
import {createProject, deleteProject, fetchProjectById, fetchProjects, updateProject} from "../api/projectsApi.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {CreateProjectRequest, UpdateProjectRequest} from "../Types/ProjectAdmin.ts";
import {toast} from "react-hot-toast";
import {isAxiosError} from "axios";

export const useProjects = (lang: string) => {
    return useQuery<ProjectResponse[], Error>({
        queryKey: ['projects', lang],
        queryFn: async ({ signal }) => {
            const result = await fetchProjects(signal);
            if (result && result.success) {
                return result.data;
            }
            throw new Error(result?.message || "Failed to load projects.");
        }
    });
};

export const useProjectById = (id: string) => {
    return useQuery<ProjectDetailedResponse, Error>({
        queryKey: ['project', id],
        queryFn: async ({ signal }) => {
            const result = await fetchProjectById(id, signal);
            if (result && result.success) {
                return result.data;
            }
            throw new Error(result?.message || "Project not found.");
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

    return useMutation({
        mutationFn: (newProject: CreateProjectRequest) =>
            toast.promise(createProject(newProject), {
                loading: 'Creating project...',
                success: 'Project created successfully!',
                error: (err) => err.message || 'Failed to create project.',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedProject: UpdateProjectRequest) =>
            toast.promise(updateProject(updatedProject), {
                loading: 'Updating project...',
                success: 'Project updated successfully!',
                error: (err) => err.message || 'Failed to update project.',
            }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['project', String(variables.id)] });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            toast.promise(deleteProject(id), {
                loading: 'Deleting project...',
                success: 'Project deleted successfully!',
                error: (err) => err.message || 'Failed to delete project.',
            }),
        onSuccess: (_, deletedId) => {
            queryClient.removeQueries({ queryKey: ['project', String(deletedId)] });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};
