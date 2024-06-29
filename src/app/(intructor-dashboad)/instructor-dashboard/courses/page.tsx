import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/dashboard/CourseCard';
import { Star } from 'lucide-react';
import FilterBtn from '@/components/FilterBtn';

const page = () => {
  return (
    <div className='flex flex-col gap-3 m-2'>
      <div className='flex flex-col w-full gap-5  bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
        <div className='flex  w-full justify-between items-center'>
          <div className='flex flex-col l gap-3'>
            <h1 className='font-bold'>Courses</h1>
            <p className=' text-gray-400'>Based on your learning activities.</p>
          </div>
          <div className='flex gap-1 bg-[#f8f8f8] border-4 border-solid border-white p-1 rounded-2xl'>
            <FilterBtn title='All Courses' color='bg-blue-300' isActive={true}>
              <Star color='white' size='20' />
            </FilterBtn>
            <FilterBtn
              title='Continue Courses'
              color='bg-green-300'
              isActive={false}
            >
              <Star color='white' size='20' />
            </FilterBtn>
            <FilterBtn
              title='Completed Courses'
              color='bg-orange-300'
              isActive={false}
            >
              <Star color='white' size='20' />
            </FilterBtn>
            <FilterBtn title='All Course' color='bg-red-300' isActive={false}>
              <Star color='white' size='20' />
            </FilterBtn>
          </div>
        </div>
        <div className='grid grid-cols-4 w-full gap-5'>
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </div>
  );
};

export default page;
