import type { ProjectResponse } from "../Types/ProjectResponse.ts";
import { fetchProjectById, fetchProjects } from "../api/projectsApi.ts";
import { useApiQuery } from "./useApiQuery.ts";
import { handleApiError } from "./handleApiError.ts";

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

export const useProjectById = (id: string, lang: string) => {
    return useApiQuery<ProjectResponse>(
        ['project', id, lang],
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