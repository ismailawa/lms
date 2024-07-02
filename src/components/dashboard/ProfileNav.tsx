import Link from 'next/link';
import React from 'react';
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
  } from "@/components/ui/alert-dialog"
import { Separator } from '../ui/separator';

interface ProfileNavProps {
  setSelectedPage: (page: string) => void;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ setSelectedPage }) => {
  return (
    <div className='bg-[#f8f8f8] border-4 border-solid border-white p-5 mx-1 rounded-2xl min-h-screen flex flex-col gap-6'>
      <ul className='flex flex-col gap-6 mb-4 text-xs text-gray-600 font-medium'>
          <Link href='#' onClick={() => setSelectedPage('profile')} className='hover:text-green-500'>Profile</Link>
          <Link href='#' onClick={() => setSelectedPage('security')} className='hover:text-green-500'>Security</Link>
          <Link href='#' onClick={() => setSelectedPage('teams')} className='hover:text-green-500'>Teams</Link>
          <Link href='#' onClick={() => setSelectedPage('billing')} className='hover:text-green-500'>Billing</Link>
          <Link href='#' onClick={() => setSelectedPage('notifications')} className='hover:text-green-500'>Notifications</Link>
      </ul>
      <AlertDialog>
        <AlertDialogTrigger className='text-sm text-red-500 font-bold mb-4 md:mb-6'>Delete Account</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle className='text-red-500 font-bold '>Are you absolutely sure?</AlertDialogTitle>
            <Separator/>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className='border border-gray-500'>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-red-500 hover:bg-red-600'>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileNav;