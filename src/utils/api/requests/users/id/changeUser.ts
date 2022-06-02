import { api } from '@utils/api';

export const changeUser = ({ params: { id, ...body }, config }: ApiParams<UsersIdReqPatchParams>) =>
  api.patch<ApiResponse<User>>(`users/${id}`, body, config);
