'use client';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { BellDot, LogOut, Edit } from 'lucide-react';

const RightsideBar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className=' hidden sm:block w-[200px] fixed shadow inset-y-0 right-0 bg-white'>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center p-4 font-medium'>
          <BellDot className='p-2 h-9 w-9 border-2 rounded-md' />
          <h2 className='font-bold text-xs'>Profile</h2>
          <Edit className='p-2 h-9 w-9 border-2 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default RightsideBar;
