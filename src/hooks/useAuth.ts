import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { loginAdmin, logoutAdmin } from '../api/authApi';
import type { LoginRequest } from '../Types/LoginRequest';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const {
        data: isAuthenticated,
        isLoading,
        isFetching
    } = useQuery<boolean>({
        queryKey: ['authStatus'],
        queryFn: async ( ) => {
            try {
                /*const response = await refreshAdminToken(signal);
                return response.success;*/
                return true;
            } catch {
                return false;
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => loginAdmin(credentials),
        onSuccess: (response) => {
            if (response.success) {
                queryClient.setQueryData(['authStatus'], true);
            }
        }
    });

    const logoutMutation = useMutation({
        mutationFn: () => logoutAdmin(),
        onSuccess: () => {
            queryClient.setQueryData(['authStatus'], false);
            queryClient.clear();
        }
    });

    return {
        isAuthenticated: !!isAuthenticated,
        isLoading: isLoading || isFetching,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending
    };
};