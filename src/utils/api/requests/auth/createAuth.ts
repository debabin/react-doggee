import { api } from '@utils/api';

export const createAuth = ({ params, config }: ApiParams<AuthReqPostParams>) =>
  api.post<ApiResponse<User>>('auth', params, config);
