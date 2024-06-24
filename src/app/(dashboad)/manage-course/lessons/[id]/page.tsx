'use client';
import React, { useEffect } from 'react';
import DynamicCard from '@/components/DynamicCard';
import { Video, LayoutDashboard } from 'lucide-react';

const EditLesson = () => {
  return (
    <div className='flex flex-col gap-14 sm:max-w-4xl mx-auto w-full'>
      <h1 className=' text-2xl font-bold'>Lesson Creation</h1>
      <div className='flex sm:flex-row flex-col w-full gap-5 py-3 justify-center'>
        <div className='flex flex-col flex-1 gap-3'>
          <div className='flex items-center gap-2 mb-4'>
            <LayoutDashboard />
            <h1 className='font-semibold text-sm '>Customize Your Lesson</h1>
          </div>

          <div className='flex flex-col gap-4'>
            <DynamicCard
              inputType='text'
              title='Lesson Title'
              placeholder='Enter Lesson Title'
              onSubmit={(value) => {
                console.log(value);
              }}
            />
            <DynamicCard
              inputType='text-area'
              title='description'
              placeholder='Enter description'
              onSubmit={(value) => {
                console.log(value);
              }}
            />
            <DynamicCard
              inputType='switch'
              title='Lesson Access'
              placeholder='Select access type'
              onSubmit={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-3'>
          <div className='flex items-center gap-2 mb-4'>
            <Video />
            <h1 className='font-semibold  text-sm'>Add Video</h1>
          </div>
          <DynamicCard inputType='video' title='Video' />
        </div>
      </div>
    </div>
  );
};

export default EditLesson;
