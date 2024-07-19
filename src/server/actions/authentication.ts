'use server';
'use server';
import { cookies } from 'next/headers';
import { deleteCookies, setAuthCookie } from '@/lib/cookies';

export async function loginAction(payload: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setAuthCookie(data.data.token, 'auth_token', { cookies });
      setAuthCookie(JSON.stringify(data.data.user), 'currentUser', { cookies });
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signUpAction(payload: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setAuthCookie(data.data.token, 'auth_token', { cookies });
      setAuthCookie(JSON.stringify(data.data.user), 'current', { cookies });
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTokenAction(payload: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function verifyTokenAction(payload: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-otp`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logoutAction() {
  deleteCookies('auth_token', { cookies });
  deleteCookies('currentUser', { cookies });
}

