'use client';

import Image from 'next/image';
import React from 'react';
import SidebarRoute from '../SidebarRoute';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import SidebarItems from '../SidebarItems';
import { LogOut, ArrowDownUp } from 'lucide-react';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/server/actions/authentication';
import { routesStudent } from '@/router/routes';

const StudentLeftsideBar = () => {
  const router = useRouter();
  const globalContext = useGlobalContext();

  return (
    <div className='hidden sm:block w-[200px] fixed shadow inset-y-0 bg-white z-10'>
      <div className='flex flex-col w-full h-full p-6 gap-4'>
        <div className='w-[127px] h-[24px] relative '>
          <Image src={'/images/logo1.png'} alt='logo' fill={true} />
        </div>
        <Separator className='bg-green-500' />
        <div className='mt-5 flex-1'>
          <div className='flex flex-col w-full gap-1 flex-1'>
            {routesStudent &&
              routesStudent.map((route: any, index: any) => {
                if (route.type === 'separator')
                  return (
                    <div
                      className=' w-full h-[0.5px] bg-slate-500'
                      key={index}
                    />
                  );
                return (
                  <SidebarItems
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
        <div
          className=' bg-green-500 flex gap-2 justify-center items-center py-2 px-3 rounded-md text-white cursor-pointer'
          onClick={() => {
            router.push('/instructor-dashboard');
          }}
        >
          Switch <ArrowDownUp />
        </div>
        <div
          className=' bg-red-500 gap-2  w-full py-2 flex justify-center items-center text-white rounded-md cursor-pointer'
          onClick={() => {
            logoutAction();
            router.push('/login');
          }}
        >
          <LogOut color='white' size={20} />
          <h1>Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default StudentLeftsideBar;
