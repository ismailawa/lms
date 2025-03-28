import StudentLeftsideBar from '@/components/dashboard/StudentLeftsideBar';
import Navbar from '@/components/dashboard/Navbar';

import React from 'react';
import { getUserProfile } from '@/server/actions/users';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getUserProfile();

  return (
    <div className='flex flex-row relative bg-[#f2f2f2]'>
      <StudentLeftsideBar />
      <div className='flex flex-col w-full min-h-screen sm:pl-[200px] relative '>
        <Navbar />
        <div className='p-4 mt-[100px] '>{children}</div>
      </div>
    </div>
  );
}
