import React from 'react';

export const useQueryLazy = <K>(url: string, config?: Omit<RequestInit, 'method'>) => {
  const [status, setStatus] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const query = React.useCallback(async (): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers),
        },
      });

      setStatus(response.status);
      return await response.json();
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
      return { success: false, data: { message: (error as Error).message } };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { query, error, isLoading, status };
};
