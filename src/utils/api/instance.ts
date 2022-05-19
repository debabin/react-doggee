export class API {
  readonly baseUrl: BaseUrl;

  readonly interceptorHandlers: Interceptors;

  readonly interceptors: {
    request: {
      use: (onSuccess: SuccessRequestFun, onFailure?: FailureFun) => void;
    };
    response: {
      use: (onSuccess: SuccessResponseFun, onFailure?: FailureFun) => void;
    };
  };

  readonly headers?: RequestInit['headers'];

  constructor(
    baseUrl: BaseUrl,
    config?: { headers?: RequestInit['headers']; interceptors?: Interceptors }
  ) {
    this.baseUrl = baseUrl;
    this.interceptorHandlers = { request: [], response: [] };
    this.interceptors = {
      request: {
        use: (onSuccess, onFailure) => {
          this.interceptorHandlers.request?.push({ onSuccess, onFailure });
        }
      },
      response: {
        use: (onSuccess, onFailure) => {
          this.interceptorHandlers.response?.push({ onSuccess, onFailure });
        }
      }
    };
    this.headers = config?.headers ?? {};
  }

  async runResponseInterceptors<T>(initialResponse: Response) {
    let body = (await initialResponse.json()) as T;

    this.interceptorHandlers.response?.forEach(({ onSuccess, onFailure }) => {
      try {
        body = onSuccess({
          status: initialResponse.status,
          statusText: initialResponse.statusText,
          ok: initialResponse.ok,
          body
        });
      } catch (e) {
        if (onFailure) {
          onFailure(e as Error);
        } else throw new Error((e as Error).message);
      }
    });

    return body;
  }

  runRequestInterceptors(initialConfig: RequestInit) {
    let config = initialConfig;

    this.interceptorHandlers.request?.forEach(({ onSuccess, onFailure }) => {
      try {
        config = onSuccess(config);
      } catch (e) {
        if (onFailure) {
          onFailure(e as Error);
        }

        throw new Error((e as Error).message);
      }
    });

    return config;
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const defaultConfig: RequestInit = {
      ...options,
      headers: { ...(!!options?.headers && options.headers), ...this.headers }
    };

    const config = this.runRequestInterceptors(defaultConfig);

    const response = await fetch(this.baseUrl + endpoint, config);

    if (!response.ok) throw new Error(response.statusText);

    return this.runResponseInterceptors<T>(response);
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  delete<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  post<T>(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) })
    });
  }

  put<T>(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      ...(!!body && { body: JSON.stringify(body) })
    });
  }

  patch<T>(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      ...(!!body && { body: JSON.stringify(body) })
    });
  }
}
