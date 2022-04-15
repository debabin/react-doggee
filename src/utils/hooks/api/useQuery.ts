import React from 'react';

export const useQuery = <K>(request: () => Promise<any>, deps: React.DependencyList = []) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<K | null>(null);

  React.useEffect(() => {
    setIsLoading(true);
    try {
      request().then(async (response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  }, deps);

  return { data, error, isLoading, status };
};
