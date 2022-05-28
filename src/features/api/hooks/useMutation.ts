import React from 'react';

import { useApiClient } from '../context';

export const useMutation = <T, K>(
  deps: string | [string, ...any[]],
  request: (body: T) => Promise<K>,
  config?: ApiClientHooksConfig<K>
) => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<K | null>(null);

  const mutation = React.useCallback(
    (body: T): void => {
      const key = typeof deps === 'string' ? deps : deps[0];
      if (apiClient.cache.mutation[key]) {
        if (
          !apiClient.cache.mutation[key].staleTime ||
          apiClient.cache.mutation[key].staleTime >= new Date().getTime()
        ) {
          setData(apiClient.cache.mutation[key].data);
          return;
        }
        apiClient.resetCacheByKey('mutation', key);
      }

      setIsLoading(true);

      request(body)
        .then((response) => {
          if (apiClient?.onSuccess) {
            apiClient?.onSuccess(response);
          }
          if (config?.onSuccess) {
            config?.onSuccess(response);
          }
          apiClient.setCache('mutation', key, {
            data: response,
            staleTime: config?.staleTime ?? apiClient.staleTime,
            cacheTime: config?.cacheTime ?? apiClient.cacheTime
          });
          setIsLoading(false);
          setData(response);
        })
        .catch((e) => {
          if (apiClient?.onFailure) {
            apiClient?.onFailure(e as Error);
          }
          if (config?.onFailure) {
            config?.onFailure(e as Error);
          }

          setIsLoading(false);
          setError((e as Error).message);
        });
    },
    typeof deps === 'string' ? [] : deps
  );

  const mutationAsync = React.useCallback(async (body: T): Promise<K> => {
    setIsLoading(true);
    const response = await request(body);
    setIsLoading(false);
    return response;
  }, []);

  return { mutation, mutationAsync, data, error, isLoading };
};
