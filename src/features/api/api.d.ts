type StaleTime = number;
type CacheTime = number;
type ApiClientCache = {
  data: any;
  staleTime: StaleTime;
  cacheTime: CacheTime;
};

type ApiClientCacheType = 'queries' | 'mutation';

interface ApiClientHooksConfig<K> {
  staleTime?: StaleTime;
  cacheTime?: CacheTime;
  onSuccess?: (data: K) => void;
  onFailure?: (error: Error) => void;
}
