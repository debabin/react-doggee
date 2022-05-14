import { api } from '@utils/api';

export const changeUser = ({ params: { id, ...body }, config }: ApiParams<UsersReqPatchParams>) =>
  api.patch<User>(`users/${id}`, body, config);
