import { useQuery, type UseQueryOptions, type QueryKey, type QueryFunctionContext }
    from '@tanstack/react-query';

type ApiQueryFn<T> = (args: { signal: AbortSignal }) => Promise<T>;

/**
 * A reusable custom hook for API queries using TanStack Query.
 * It abstracts the common logic for fetching data.
 *
 * @param queryKey The unique key for the query, used for caching.
 * @param queryFn The asynchronous function that fetches the data. It receives an AbortSignal.
 * @param options Optional TanStack Query options to customize the query behavior.
 * @returns The result of the useQuery hook.
 */
export const useApiQuery = <T>(
    queryKey: QueryKey,
    queryFn: ApiQueryFn<T>,
    options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<T, Error, T, QueryKey>({
        queryKey,
        queryFn: (context: QueryFunctionContext) => queryFn({ signal: context.signal }),
        ...options,
    });
};