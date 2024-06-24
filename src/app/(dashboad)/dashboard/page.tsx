import GetStarted from '@/components/dashboard/GetStarted';
import { getInstructorsCourse } from '@/server/actions/courses';
import React, { useState } from 'react';

const page = async () => {
  const data = await getInstructorsCourse();
  return (
    <div className='w-full sm:max-w-5xl mx-auto'>
      <div className='flex flex-col w-full'>
        {data.data.courses.lenght === 0 && <GetStarted />}
      </div>
    </div>
  );
};

export default page;
