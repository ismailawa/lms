'use client';
import React, { useState } from 'react';
import MyVideoPlayer from '@/components/VideoPlayer';
import { Book, Heart, PlayCircle, Plus } from 'lucide-react';
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating';
import Preview from '@/app/(intructor-dashboad)/instructor-dashboard/manage-course/components/Preview';

type CourseDetailsSectioProps = {
  course: any;
};

const CourseDetailsSection = ({ course }: CourseDetailsSectioProps) => {
  const [rating, setRating] = useState(0); // Initial value
  return (
    <div className='flex flex-col w-full gap-3'>
      <div className='flex flex-col w-full gap-5  bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
        <div className='flex w-full items-center gap-2'>
          <Book size={20} />
          <h1 className='text-sm font-bold'>Course</h1>
          <h1 className=' text-xs'>{course.title}</h1>
        </div>
        <div className='w-full h-[400px] relative bg-fuchsia-800 rounded-xl overflow-hidden'>
          <MyVideoPlayer id='mymakaranta-video/nypzhaazkpqclkssgbhb' />
        </div>
      </div>
      <div className='flex flex-col w-full gap-6 bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex gap-2 items-center text-xs'>
            <div className=' bg-[#f8f8f8] border-4 border-solid border-white px-2 py-1 rounded-2xl'>
              Advance
            </div>
            <div className=' bg-[#f8f8f8] border-4 border-solid border-white px-2 py-1 rounded-2xl'>
              Live Class
            </div>
            <div className=' bg-[#f8f8f8] border-4 border-solid border-white px-2 py-1 rounded-2xl'>
              24 Class
            </div>
          </div>
          <div className='flex gap-2 items-center text-xs'>
            <div className='flex items-center gap-2 bg-green-400 border-[0.5px] border-gray-600 p-2 rounded-lg cursor-pointer'>
              <Plus size={15} />
              <h1>Enroll</h1>
            </div>
            <div className='flex items-center gap-1 border-[0.5px] border-gray-600 p-2 rounded-lg cursor-pointer'>
              <Heart size={15} />
              <h1>Add to favourites</h1>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-lg font-semibold px-3'>{course.title}</h1>
          <div>
            <Preview value={course.descriptions} amountOfWords={100} />
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full gap-4 bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
        <div className='w-20 h-20 rounded-lg relative overflow-hidden border-2 border-gray-300 flex-none'>
          <Image src={'/images/avatar.jpeg'} alt='' fill />
        </div>
        <div className='flex flex-col gap-1 flex-none'>
          <h1 className='text-xs text-gray-500'>Instructor</h1>
          <p>Ismailawa Aliyu</p>
          <div className='flex '>
            <Rating
              style={{ maxWidth: 100 }}
              value={rating}
              onChange={setRating}
            />
          </div>
        </div>
        <div className='text-sm text-gray-500'>
          Im on a mission to create more user experience professionals. Perhaps
          youd like a job in user experience. Or maybe you already work in the
          field but youve never had any formal training.
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSection;
