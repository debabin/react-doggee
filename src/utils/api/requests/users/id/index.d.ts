interface UsersIdReqPatchParams {
  id: User['id'];
  name?: User['name'];
  registrationAddress?: User['registrationAddress'];
  birthDate?: User['birthday'];
  pets?: Pet[];
}

interface UsersIdReqGetParams {
  id: User['id'];
}
