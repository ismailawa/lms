'use client';
import MyVideoPlayer from '@/components/VideoPlayer';
import { Book, Heart, PlayCircle, Plus } from 'lucide-react';
import Image from 'next/image';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

import React, { useState } from 'react';
import PlayListItem from '@/components/PlayListItem';
import VideoTab from '@/components/VideoTab';

const CourseDetails = () => {
  const [rating, setRating] = useState(0); // Initial value
  return (
    <div className='flex gap-3 m-2'>
      <div className='flex flex-col w-full gap-3'>
        <div className='flex flex-col w-full gap-5  bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
          <div className='flex w-full items-center gap-2'>
            <Book size={20} />
            <h1 className='text-sm font-bold'>Course</h1>
            <h1 className=' text-xs'>Introduction to Software Development</h1>
          </div>
          <div className='w-full h-[400px] relative bg-fuchsia-800 rounded-xl overflow-hidden'>
            <MyVideoPlayer id='myVideoPlayer' src='https://hhhhhhah.com' />
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
            <h1 className='text-lg font-semibold'>
              The Ultimate Guide to Usability testing and UX Law
            </h1>
            <p className='text-sm text-gray-400'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className='text-sm text-gray-400'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className='text-sm text-gray-400'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
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
            Im on a mission to create more user experience professionals.
            Perhaps youd like a job in user experience. Or maybe you already
            work in the field but youve never had any formal training.
          </div>
        </div>
      </div>
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
            Illustration. Your dedication to learnine Is Impressive rinisn
            stone.
          </p>

          <div className='flex w-full justify-between'>
            <h1>Course Completion</h1>
            <h1>1/25</h1>
          </div>
        </div>
        <div className='flex w-full justify-between text-xs'>
          <div className='flex justify-center items-center border-2 p-2 rounded-lg cursor-pointer '>
            All Videos (34)
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
    </div>
  );
};

export default CourseDetails;
