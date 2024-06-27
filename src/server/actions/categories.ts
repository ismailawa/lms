'use server';
import { getValidAuthTokens } from '@/lib/cookies';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function createCategoryAction(payload: Record<string, any>) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
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
      revalidateTag('categories');
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}

export async function getCategoriesAction() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        next: { tags: ['categories'] },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}
