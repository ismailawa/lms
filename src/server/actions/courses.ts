'use server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

import { getValidAuthTokens } from '@/lib/cookies';

export async function createCourse(title: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        body: JSON.stringify({ title }),
      }
    );

    if (response.ok) {
      revalidateTag('courses');
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}
export async function createLesson(
  title: string,
  courseId: number,
  position: number
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/lessons`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        body: JSON.stringify({ title, courseId }),
      }
    );

    if (response.ok) {
      revalidateTag('courses');
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}

export async function getAllPublishedCourses() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/published`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        next: { tags: ['courses'] },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}

export async function getInstructorsCourse() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/instructors`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        next: { tags: ['courses'] },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}
export async function getCourseAction(id: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        next: { tags: ['courses'] },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error(error);
  }
}

export async function updateCourse(id: any, payload: Record<string, any>) {
  console.log(id, payload, 'updateCourse');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`,
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
      revalidateTag('courses');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function enrollCourse(id: any, payload: Record<string, any>) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}/enrollment`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      revalidateTag('courses');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateReOrderAction(
  id: any,
  payload: Record<string, any>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}/reorder`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (response.ok) {
      revalidateTag('courses');
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function publishAndUnpublishCourseAction(id: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}/toggle-publish`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        body: JSON.stringify({}),
      }
    );
    if (response.ok) {
      revalidateTag('courses');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
