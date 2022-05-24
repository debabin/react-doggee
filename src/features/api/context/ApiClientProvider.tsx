import React from 'react';

import type { ApiClientContextProps } from './ApiClientContext';
import { ApiClientContext } from './ApiClientContext';

interface CacheProviderProps {
  children: React.ReactNode;
  staleTime?: StaleTime;
  cacheTime?: CacheTime;
  onFailure?: (e: Error) => void;
  onSuccess?: (data: any) => void;
}

export const ApiClientProvider: React.FC<CacheProviderProps> = ({
  children,
  cacheTime = 300000,
  staleTime = 0,
  onFailure,
  onSuccess
}) => {
  const [apiClient, setApiClient] = React.useState<
    Omit<ApiClientContextProps, 'resetCacheByKey' | 'setCache'>
  >({
    staleTime,
    onFailure,
    onSuccess,
    cacheTime,
    cache: { queries: {}, mutation: {} }
  });

  const resetCacheByKey = (cacheType: ApiClientCacheType, key: string) => {
    const { [key]: omit, ...cache } = apiClient.cache[cacheType];
    setApiClient({ ...apiClient, cache: { ...apiClient.cache, [cacheType]: cache } });
  };

  const value = React.useMemo(
    () => ({
      ...apiClient,
      resetCacheByKey,
      setCache: (cacheType: ApiClientCacheType, key: string, cache: ApiClientCache) => {
        setApiClient({
          ...apiClient,
          cache: {
            ...apiClient.cache,
            [cacheType]: {
              [key]: {
                data: cache.data,
                cacheTime: cache.cacheTime,
                staleTime: cache.staleTime
                  ? new Date(new Date().getTime() + cache.staleTime).getTime()
                  : 0
              }
            }
          }
        });

        setTimeout(() => {
          resetCacheByKey(cacheType, key);
        }, cache.cacheTime);
      }
    }),
    [apiClient.cache]
  );

  // console.log('cache', apiClient.cache);
  return <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>;
};
