
'use server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { getValidAuthTokens } from '@/lib/cookies';

export async function getUserProfile() {
  console.log(getValidAuthTokens({ cookies }).token);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
        },
        next: { tags: ['profile'] },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();

    return {
      name: data.firstName + ' ' + data.lastName,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      location: data.location,
      email: data.email,
      phone: data.phone,
      bio: data.bio,
      address: {
        country: data.address.country,
        city: data.address.city,
        postalCode: data.address.postalCode,
        taxId: data.address.taxId
      }
    };
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}



// 'use server';
// import { cookies } from 'next/headers';
// import { revalidateTag } from 'next/cache';
// import { getValidAuthTokens } from '@/lib/cookies';

// export async function getUserProfile() {
//   console.log(getValidAuthTokens({ cookies }).token);

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
//         },
//         next: { tags: ['profile'] },
//       }
//     );
//     console.log(response);

//     const data = await response.json();

//     return data;
//   } catch (error: any) {
//     console.log(error);

//     throw error;
//   }
// }

// export async function updateUsers(id: number, payload: Record<string, any>) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`,
//       {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${getValidAuthTokens({ cookies }).token}`,
//         },
//         body: JSON.stringify(payload),
//       }
//     );
//     const data = await response.json();
//     if (response.ok) {
//       revalidateTag('profile');
//     }
//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }
