import React from 'react';

export const useQueryLazy = <K>(request: () => Promise<any>) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const query = React.useCallback(async (): Promise<K | undefined> => {
    setIsLoading(true);
    try {
      return await request().then(async (response) => response);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { query, error, isLoading };
};
