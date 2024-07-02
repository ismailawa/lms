import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

interface ProfileNavProps {
  setSelectedPage: (page: string) => void;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ setSelectedPage }) => {
  return (
    <div className='bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl min-h-screen flex flex-col gap-6'>
      <ul className='flex flex-col gap-6 mb-4 text-xs text-gray-600 font-medium'>
          <Link href='#' onClick={() => setSelectedPage('profile')}>Profile</Link>
          <Link href='#' onClick={() => setSelectedPage('security')}>Security</Link>
          <Link href='#' onClick={() => setSelectedPage('teams')}>Teams</Link>
          <Link href='#' onClick={() => setSelectedPage('billing')}>Billing</Link>
          <Link href='#' onClick={() => setSelectedPage('notifications')}>Notifications</Link>
      </ul>
      <Link href='#' onClick={() => setSelectedPage('delete')} className='text-red-500 text-xs font-medium'>Delete Account</Link>
    </div>
  );
};

export default ProfileNav;