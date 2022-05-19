import React from 'react';

export interface ApiClientContextProps {
  cache: { queries: Record<string, ApiClientCache>; mutation: Record<string, ApiClientCache> };
  staleTime: StaleTime;
  cacheTime: CacheTime;
  onFailure?: (e: Error) => void;
  onSuccess?: (data: any) => void;
  setCache: (cacheType: ApiClientCacheType, key: string, data: ApiClientCache) => void;
  resetCacheByKey: (cacheType: ApiClientCacheType, key: string) => void;
}

export const ApiClientContext = React.createContext<ApiClientContextProps>({
  cache: { queries: {}, mutation: {} },
  staleTime: 0,
  cacheTime: 300000,
  setCache: () => {},
  resetCacheByKey: () => {}
});
