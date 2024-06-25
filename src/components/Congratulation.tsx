'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import ReactConfetti from 'react-confetti';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/GlobalContextProvider';

const Congratulation = () => {
  const router = useRouter();
  const globalContext = useGlobalContext();
  const [windowDimension, setWindowDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 1400, height: 800 });

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, []);

  return (
    <>
      <div className='flex absolute inset-0 z-[1000] bg-white justify-center items-center'>
        <div className='flex flex-col w-[400px] items-center gap-4'>
          <ReactConfetti
            width={windowDimension.width}
            height={windowDimension.height}
          />
          <h1 className='text-3xl font-semibold'>Congratulations</h1>
          <p className=' text-center text-xs'>
            Welcome to MyMakaranta, where you learn the lastest and trending
            Technologies and Skills
          </p>
          <Button
            className='w-full'
            onClick={() => {
              // globalContext.setCongratulation(false);
              router.replace('/student-dashboard');
            }}
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </>
  );
};

export default Congratulation;
