import Cookies from 'js-cookie';

const ACCESS_COOKIE_NAME = 'wedding_access';

export const setAccessCookie = () => {
  Cookies.set(ACCESS_COOKIE_NAME, 'true', { expires: 30, secure: true });
};

export const getAccessCookie = () => {
  return Cookies.get(ACCESS_COOKIE_NAME) === 'true';
};

export const removeAccessCookie = () => {
  Cookies.remove(ACCESS_COOKIE_NAME);
};

export const validatePassword = (password: string) => {
  return password === process.env.ACCESS_KEY;
};