'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '../ui/separator';
import { useGlobalContext } from '@/context/GlobalContextProvider';

interface ProfileNavProps {
  setSelectedPage: (page: string) => void;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ setSelectedPage }) => {
  const { setIsLoggedIn } = useGlobalContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const currentUserCookie = getCookie('currentUser');
      
      if (!currentUserCookie) {
        throw new Error('User data not found in cookies');
      }

      let userId: string | undefined;
      try {
        const currentUser = JSON.parse(currentUserCookie);
        userId = currentUser?.id;
      } catch (error) {
        throw new Error('Failed to parse user data from cookies');
      }

      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await axios.delete(`/api/users/${userId}`);
      if (response.status === 200) {
        await axios.post('/api/users/logout');
        setIsLoggedIn(false);
        window.location.href = '/login';
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to delete account', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='bg-[#f8f8f8] border-4 border-solid border-white p-5 mx-1 rounded-2xl min-h-screen flex flex-col gap-6'>
      <ul className='flex flex-col gap-6 text-xs text-gray-600 font-medium'>
        <Link href='#' onClick={() => setSelectedPage('profile')} className=' text-lg hover:text-green-500'>
          Profile
        </Link>
        <Link href='#' onClick={() => setSelectedPage('security')} className='text-lg hover:text-green-500'>
          Security
        </Link>
        <Link href='#' onClick={() => setSelectedPage('teams')} className='hover:text-green-500 text-lg'>
          Teams
        </Link>
        <Link href='#' onClick={() => setSelectedPage('billing')} className='hover:text-green-500 text-lg'>
          Billing
        </Link>
      </ul>
      <AlertDialog>
        <AlertDialogTrigger className=' text-red-500 font-bold mb-4 md:mb-6 text-lg'>
          Delete Account
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-red-500 font-bold '>
              Are you absolutely sure?
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='border border-gray-500'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-500 hover:bg-red-600'
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileNav;
