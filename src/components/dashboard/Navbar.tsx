'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  SearchIcon,
  ChevronRightCircle,
  ChevronRightIcon,
  MessageCirclePlusIcon,
  Bell,
} from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const listOfPath = path.split('/');
  return (
    <div className='flex flex-col flex-1 fixed sm:left-[200px] z-50 inset-x-0'>
      <div className='flex h-[70px] w-full bg-white justify-between items-center px-6'>
        <div className='flex items-center gap-8'>
          <div className=' flex flex-col'>
            <h1 className=' text-lg font-semibold'>Hello Ismailawa 👋</h1>
            <p className=' text-xs  text-gray-500'>
              Let’s learn something new today!
            </p>
          </div>
          <div className='hidden sm:flex items-center w-[400px] h-[40px] relative'>
            <Input placeholder='Search courses....' className='w-full' />
            <SearchIcon className=' absolute right-2 cursor-pointer' />
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <MessageCirclePlusIcon />
          <Bell />
          <div className=' w-[0.3px] h-10 bg-slate-400' />
          <div
            className='flex gap-2 items-center cursor-pointer'
            onClick={() => {
              router.push('/student-dashboard/profile');
            }}
          >
            <div className='relative w-10 h-10 rounded-full bg-zinc-200 overflow-hidden border-2'>
              <Image src='/images/avatar.jpeg' alt='' fill />
            </div>
            <div className='flex flex-col'>
              <h1 className=''>Ismailawa Aliyu</h1>
              <p className='text-xs text-gray-500'>Software developer</p>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[30px] w-full bg-white flex flex-row items-center px-4 pb-4'>
        {listOfPath.map((path, index) => (
          <div
            key={index}
            className={`flex gap-1 ml-1 items-center ${
              index !== listOfPath.length - 1 ? ' cursor-pointer' : ''
            }`}
            onClick={() => {
              if (index !== listOfPath.length - 1) router.back();
            }}
          >
            <h1
              key={index}
              className={`text-sm text-gray-400 ${
                index !== listOfPath.length - 1
                  ? ' font-semibold text-gray-600'
                  : ''
              }`}
            >
              {path}
            </h1>
            {index !== listOfPath.length - 1 && path !== '' && (
              <ChevronRightIcon />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
