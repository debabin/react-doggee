import { setCookie } from './setCookie';

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};
