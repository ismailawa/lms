'use client';
import React, { useEffect } from 'react';
import DynamicCard from '@/components/DynamicCard';
import { Button } from '@/components/ui/button';
import { Trash2, DollarSign, Paperclip } from 'lucide-react';

const Edit = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    // params.id
  }, [params.id]);

  return (
    <div className='flex flex-col gap-14 sm:max-w-5xl mx-auto w-full'>
      <h1 className=' text-2xl font-bold'>Course Creation</h1>
      <div className='flex sm:flex-row flex-col w-full gap-5 py-3 justify-center'>
        <div className='flex flex-col flex-1 gap-3'>
          <h1 className='font-semibold text-sm mb-4'>Customize Your Course</h1>
          <div className='flex flex-col gap-4'>
            <DynamicCard
              inputType='text'
              title='Course Title'
              placeholder='Enter Course Title'
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
              inputType='image'
              title='image'
              placeholder='Enter image'
              onSubmit={(value) => {
                console.log(value);
              }}
            />
            <DynamicCard
              inputType='select'
              title='category'
              placeholder='Enter category'
              onSubmit={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-3'>
          <div className='flex w-full justify-between items-center'>
            <h1 className='font-semibold  text-sm'>Course Lessons</h1>
            <div className='flex gap-4 items-center '>
              <Button variant={'outline'}>Publish</Button>
              <Button variant={'outline'}>
                <Trash2 />
              </Button>
            </div>
          </div>
          <DynamicCard
            inputType='add-lesson'
            title='lessons'
            placeholder='lessons'
            onSubmit={(value) => {
              console.log(value);
            }}
          />
          <div className='flex items-center mt-5 gap-3'>
            <div className='p-2 border rounded-full border-green-600'>
              <DollarSign size={16} />
            </div>
            <h1 className=' font-semibold'>Sell your course</h1>
          </div>
          <DynamicCard
            inputType='text'
            pattern='^\$\d{1,3}(,\d{3})*(\.\d+)?$'
            title='Course Price'
            placeholder='N 3,000.00'
            onSubmit={(value) => {
              console.log(value);
            }}
          />
          <div className='flex items-center mt-5 gap-3'>
            <div className='p-2 border rounded-full border-green-600'>
              <Paperclip size={16} />
            </div>
            <h1 className=' font-semibold'>Resources and Attachments</h1>
          </div>
          <DynamicCard
            inputType='add-file'
            title='Resources and Attachments'
            placeholder='Resources and Attachments'
            onSubmit={(value) => {
              console.log(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
