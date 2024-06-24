// lib/cookies.ts
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

// helpers to get cookies
const getAuthCookie = (name: string, options: Record<string, any>) => {
  const cookie = getCookie(name, options);

  if (!cookie) return undefined;

  return Buffer.from(cookie, 'base64').toString('ascii');
};

const deleteAuthCookie = (name: string, options: Record<string, any>) => {
  deleteCookie(name, options);
};

export const setAuthCookie = (
  token: string,
  name: string,
  options: Record<string, any>
) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    ...options,
    // more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
};

export const getValidAuthTokens = (options: Record<string, any>) => {
  const token = getAuthCookie('auth_token', options);

  // const now = new Date();
  // const tokenDate = new Date(token || 0);

  // return {
  //   token: now < tokenDate ? token : undefined,
  // };
  return {
    token,
  };
};

export const deleteCookies = (name: string, options: Record<string, any>) => {
  deleteAuthCookie(name, options);
};
