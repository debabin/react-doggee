import React from 'react';

import { useApiClient } from '../context';

export const useQueryLazy = <K>(
  deps: string | [string, ...any[]],
  request: () => Promise<K>,
  config?: ApiClientHooksConfig<K>
) => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const query = React.useCallback(
    async (): Promise<K | undefined> => {
      const key = typeof deps === 'string' ? deps : deps[0];
      if (apiClient.cache.queries[key]) {
        if (
          !apiClient.cache.queries[key].staleTime ||
          apiClient.cache.queries[key].staleTime >= new Date().getTime()
        ) {
          return apiClient.cache.queries[key].data;
        }
        apiClient.resetCacheByKey('queries', key);
      }

      setIsLoading(true);

      return request()
        .then(async (response) => {
          if (apiClient?.onSuccess) {
            apiClient?.onSuccess(response);
          }
          if (config?.onSuccess) {
            config?.onSuccess(response);
          }

          apiClient.setCache('queries', key, {
            data: response,
            staleTime: config?.staleTime ?? apiClient.staleTime,
            cacheTime: config?.cacheTime ?? apiClient.cacheTime
          });
          setIsLoading(false);
          return response;
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
          return undefined;
        });
    },
    typeof deps === 'string' ? [] : deps
  );

  return { query, error, isLoading };
};
