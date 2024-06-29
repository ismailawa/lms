import CourseCard from '@/components/dashboard/CourseCard';
import React from 'react';

type RecomemdationSectionProps = {
  data: any;
};

const RecomendationSection = ({ data }: RecomemdationSectionProps) => {
  return (
    <div className='flex flex-col w-full gap-5  bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
      <div className='flex  w-full justify-between items-center'>
        <div className='flex flex-col l gap-3'>
          <h1 className='font-bold'>Recommended Courses</h1>
          <p className=' text-gray-400'>
            Based on your learning activities, we have curated a personalized
            course just for you.
          </p>
        </div>
        <div className='flex items-center bg-green-500 text-white py-2 px-5 cursor-pointer rounded-lg'>
          View All
        </div>
      </div>
      <div className='flex w-full gap-3'>
        {data.data.courses.map((item: any, index: number) => (
          <CourseCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default RecomendationSection;
