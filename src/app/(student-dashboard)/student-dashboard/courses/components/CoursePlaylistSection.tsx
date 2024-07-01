'use client';
import React from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import VideoTab from '@/components/VideoTab';

type CoursePlaylistSectionProps = {
  lessons: any;
};

const CoursePlaylistSection = ({ lessons }: CoursePlaylistSectionProps) => {
  return (
    <div className='flex flex-col w-[500px] h-[1100px] gap-3  bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
      <div className='flex flex-col my-4 gap-6'>
        <h1 className='text-sm text-gray-500 font-semibold'>
          Your study progress: <span className=' text-green-600'>75%</span>
        </h1>
        <div className=' mb-2 px-3'>
          <ProgressBar
            percent={75}
            filledBackground='linear-gradient(to right, #07cb4f, #0abb5a)'
            unfilledBackground='linear-gradient(to right, #09da565a, #5df4a171)'
          >
            <Step transition='scale'>
              {({ accomplished }) => (
                <div className='relative flex justify-center w-4 h-4 rounded-full bg-green-600'></div>
              )}
            </Step>
            <Step transition='scale'>
              {({ accomplished }) => (
                <div className='relative flex justify-center w-4 h-4 rounded-full bg-green-600'></div>
              )}
            </Step>
            <Step transition='scale'>
              {({ accomplished }) => (
                <div className='relative flex justify-center w-4 h-4 rounded-full bg-green-600'></div>
              )}
            </Step>
            <Step transition='scale'>
              {({ accomplished }) => (
                <div className='relative flex justify-center w-4 h-4 rounded-full bg-green-600'></div>
              )}
            </Step>
            <Step transition='scale'>
              {({ accomplished }) => (
                <div className='relative flex justify-center w-4 h-4 rounded-full bg-green-600'></div>
              )}
            </Step>
          </ProgressBar>
        </div>

        <p className=' text-xs border-2 text-black/25 border-green-300 p-3 rounded-lg bg-green-100/10'>
          Great Job! You are on the path to becoming a certified Mastering
          Illustration. Your dedication to learnine Is Impressive rinisn stone.
        </p>

        <div className='flex w-full justify-between'>
          <h1>Course Completion</h1>
          <h1>1/25</h1>
        </div>
      </div>
      <div className='flex w-full justify-between text-xs'>
        <div className='flex justify-center items-center border-2 p-2 rounded-lg cursor-pointer '>
          All Videos ({lessons.length})
        </div>
        <div className='flex justify-center items-center border-2 p-2 rounded-lg cursor-pointer'>
          Resources
        </div>
        <div className='flex justify-center items-center border-2 p-2 rounded-lg cursor-pointer'>
          Support
        </div>
      </div>
      <VideoTab />
    </div>
  );
};

export default CoursePlaylistSection;
