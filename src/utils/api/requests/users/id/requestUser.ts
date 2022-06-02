import { api } from '@utils/api';

export const requestUser = ({ params: { id }, config }: ApiParams<UsersIdReqGetParams>) =>
  api.get<ApiResponse<User>>(`users/${id}`, config);
