'use client';
import GetStarted from '@/components/dashboard/GetStarted';
import { getInstructorsCourse } from '@/server/actions/courses';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInstructorsCourse();
      if (data.data.courses) {
        setIsFirst(data.data.courses.length === 0);
      }
    };
    fetchData();
  }, [isFirst]);

  return (
    <div className='flex flex-col w-full'>
      {isFirst ? (
        <div className='w-full sm:max-w-5xl mx-auto'>
          <GetStarted />
        </div>
      ) : (
        <div>Dashboard</div>
      )}
    </div>
  );
};

export default Dashboard;
