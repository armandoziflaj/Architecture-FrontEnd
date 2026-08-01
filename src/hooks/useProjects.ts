import type {ProjectDetailedResponse, ProjectResponse} from "../Types/ProjectResponse.ts";
import {createProject, deleteProject, fetchProjectById, fetchProjects, updateProject} from "../api/projectsApi.ts";
import { useApiQuery } from "./useApiQuery.ts";
import { handleApiError } from "./handleApiError.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {CreateProjectRequest, UpdateProjectRequest} from "../Types/ProjectAdmin.ts";

export const useProjects = (lang: string) => {
    return useApiQuery<ProjectResponse[]>(
        ['projects', lang],
        async ({ signal }) => {
            try {
                const result = await fetchProjects(signal);

                if (!result.success) {
                    return handleApiError(new Error(result.message || "Failed to load projects"));
                }

                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        }
    );
};

export const useProjectById = (id: string) => {
    return useApiQuery<ProjectDetailedResponse>(
        ['project', id],
        async ({ signal }) => {
            try {
                const result = await fetchProjectById(id, signal);

                if (!result.success) {
                    return handleApiError( new Error(result.message || "Failed to load project"));
                }

                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        { enabled: !!id }
    );
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProject: CreateProjectRequest) => {
            try {
                const result = await createProject(newProject);
                if (!result.success) {
                    return handleApiError(new Error(result.message || "Failed to create project"));
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};
export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedProject: UpdateProjectRequest) => {
            try {
                const result = await updateProject(updatedProject);
                if (!result.success) {
                    return handleApiError(new Error(result.message || "Failed to update project"));
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['project', String(variables.id)] });
            queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};
export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            try {
                const result = await deleteProject(id);
                if (!result.success) {
                    return handleApiError(new Error(result.message || "Failed to delete project"));
                }
                return result.data;
            } catch (err) {
                return handleApiError(err);
            }
        },
        onSuccess: (_, deletedId) => {
            queryClient.removeQueries({ queryKey: ['project', String(deletedId)] });
            queryClient.removeQueries({ queryKey: ['project', deletedId] });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};