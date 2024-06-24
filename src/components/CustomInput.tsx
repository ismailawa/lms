import React from 'react';
import { Input, InputProps } from './ui/input';
import { Separator } from './ui/separator';

export type CustomInpuPropst = InputProps & {
  title: string;
  enableLine?: boolean;
};

const CustomInput = ({
  title,
  enableLine = false,
  ...props
}: CustomInpuPropst) => {
  return (
    <div className='flex flex-col w-full gap-2 '>
      <h1 className=' text-sm'>{title}</h1>
      {enableLine && (
        <div className='mb-3'>
          <Separator />
        </div>
      )}
      <Input {...props} className='bg-[#F8F8F8]' />
    </div>
  );
};

export default CustomInput;
