'use client';

import { LucideProps, Star } from 'lucide-react';
import React from 'react';

type FilterBtnProps = {
  children: React.ReactNode;
  title: string;
  color: string;
  isActive: boolean;
  //   onClick: () => void;
};

const FilterBtn = ({ children, title, color, isActive }: FilterBtnProps) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg bg-white ${
        isActive ? ' border-2 border-green-600' : ''
      } p-2 cursor-pointer`}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-lg ${color}`}
      >
        {children}
      </div>
      <div className='flex flex-col'>
        <h1
          className={`text-sm ${isActive ? ' text-green-600' : 'text-black'}`}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default FilterBtn;
