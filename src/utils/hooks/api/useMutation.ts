import React from 'react';

type MutationMethods = 'post' | 'put' | 'delete';

export const useMutation = <T, K>(
  url: string,
  method: MutationMethods,
  config?: Omit<RequestInit, 'method'>,
) => {
  const [status, setStatus] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const mutation = React.useCallback(async (body: T): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        credentials: 'same-origin',
        ...config,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers),
        },
        ...(!!body && { body: JSON.stringify(body) }),
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

  return { mutation, error, isLoading, status };
};
