'use server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

import { getValidAuthTokens } from '@/lib/cookies';

export async function createLesson(payload: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/lessons`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      revalidateTag('lessons');
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}

export async function getLessonByIdAction(id: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/lessons/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        next: { tags: ['lessons'] },
      }
    );
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}

export async function updateLessonAction(
  id: any,
  payload: Record<string, any>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/lessons/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      revalidateTag('lessons');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
