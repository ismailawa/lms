'use client';
import Congratulation from '@/components/Congratulation';
import StepContextProvider from '@/context/StepContextProvider';
import FinalValueContextProvider from '@/context/FinalValueContextProvider';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import Image from 'next/image';
import React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalContext = useGlobalContext();
  return (
    <div className='flex w-full h-screen relative'>
      <div className='w-1/2 sm:flex  h-full relative hidden'>
        <Image src={'/images/login.png'} alt='Login' fill />
        <div className='absolute bottom-2 -right-11'>
          <h1 className='text-xs'>@ 2023 meHub, All right reserved</h1>
        </div>
      </div>
      <div className='flex flex-col overflow-x-scroll sm:w-1/2 w-full'>
        <StepContextProvider>
          <FinalValueContextProvider>{children}</FinalValueContextProvider>
        </StepContextProvider>
      </div>
      {globalContext.isCongratulation && <Congratulation />}
    </div>
  );
}
