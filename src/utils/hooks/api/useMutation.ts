import React from 'react';

export const useMutation = <T, K>(request: (body: T) => Promise<K>) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<K | null>(null);

  const mutation = React.useCallback((body: T): void => {
    setIsLoading(true);
    try {
      request(body).then((response) => {
        setIsLoading(false);
        setData(response);
      });
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  }, []);

  const mutationAsync = React.useCallback(async (body: T): Promise<K | undefined> => {
    setIsLoading(true);
    try {
      return await request(body);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutation, mutationAsync, data, error, isLoading };
};
