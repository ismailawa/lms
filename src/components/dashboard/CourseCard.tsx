'use client';
import React from 'react';
import MyVideoPlayer from '../VideoPlayer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CourseEnrollment from './CourseEnrollment';

const CourseCard = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-5 bg-[#f8f8f8] border-4 border-solid border-white hover:border-green-600  transition duration-300 p-3 rounded-2xl w-[270px] flex-none'>
      <div
        className=' relative flex w-full h-40 bg-black rounded-lg overflow-hidden cursor-pointer'
        onClick={() => {
          router.push('/courses/12');
        }}
      >
        <Image src='/images/screen.png' alt='' fill />
        <div className=' absolute bg-white p-2 text-xs right-2 bottom-2 rounded-md'>
          ₦ 2000
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-sm font-semibold'>
          The Ultimate Guide to Usability test and UX Law
        </h1>
        <p className=' text-xs text-gray-400'>
          Get a job in UX and your user research and UX design Skills
        </p>
      </div>
      <div className='flex w-full text-xs justify-between'>
        <div className='p-2 bg-gray-200 border-[1px] border-gray-400 rounded-lg'>
          Advance
        </div>
        <div className='p-2 bg-gray-200 border-[1px] border-gray-400 rounded-lg'>
          Live Class
        </div>
        <div className='p-2 bg-gray-200 border-[1px] border-gray-400 rounded-lg'>
          38 Lessons
        </div>
      </div>
      <CourseEnrollment />
      {/* <div
        className='flex w-full border-2 border-gray-300 justify-center items-center py-2 hover:text-white text-sm bg-[#f8f8f8] hover:bg-green-600 rounded-lg cursor-pointer'
        onClick={() => {}}
      >
        Enrol Now
      </div> */}
    </div>
  );
};

export default CourseCard;
