import React, { Children } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

type GetStartedCardProps = {
  image: string;
  title: string;
  description: string;
  link: string;
  children?: React.ReactNode;
};

const GetStartedCard = ({
  image,
  title,
  description,
  children,
  link,
}: GetStartedCardProps) => {
  return (
    <div className='w-full bg-white rounded-md p-4 sm:min-h-[200px]'>
      <div className='flex sm:flex-row flex-col w-full items-center justify-start gap-3'>
        <div className=' relative w-[214px] h-[149px] flex-none'>
          <Image src={image} alt={''} fill />
        </div>
        <div className='flex flex-col gap-4 justify-between'>
          <h1 className=' sm:text-left text-center text-xl font-semibold'>
            {title}
          </h1>
          <p className='sm:text-left text-center text-xs text-gray-400'>
            {description}
          </p>
          {children != null ? (
            <div>{children}</div>
          ) : (
            <Button className='sm:w-fit w-full'>Get Started</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStartedCard;
