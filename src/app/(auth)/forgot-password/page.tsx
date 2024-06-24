'use client';
import CustomInput from '@/components/CustomInput';
import OTPFieldd from '@/components/signup/OTPFieldd';
import SetPassword from '@/components/signup/SetPassword';
import { Button } from '@/components/ui/button';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ForgotPassword = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentItem = useMemo(() => {
    switch (stepIndex) {
      case 1:
        return <OTPFieldd />;
      case 2:
        return (
          <SetPassword
            title={'Set your new password'}
            description={
              'Enter your new password details to reset the password for your account'
            }
          />
        );

      default:
        return null;
    }
  }, [stepIndex]);

  const verifyOtp = async () => {
    setStepIndex(1);
  };

  const signup = async () => {};

  return (
    <div className='flex flex-col justify-center items-center sm:pt-20 pt-10 w-full sm:px-28 px-6 h-full'>
      <div className='flex flex-col w-full h-full'>
        <div className='w-[203px] h-[40px] relative'>
          <Image src={'/images/logo1.png'} alt='' fill />
        </div>

        {stepIndex === 0 ? (
          <div>
            <div className='flex flex-col gap-1 mt-20'>
              <h1 className=' text-2xl font-bold'>Forgot your password?</h1>
              <p className=' text-xs'>
                Please enter your email address and well send you an <br /> OTP
                to reset your password.
              </p>
            </div>
            <div className='flex flex-col w-full gap-4 mt-6 justify-center'>
              <CustomInput title='Email' placeholder='Email address' />
            </div>
          </div>
        ) : (
          <div className='flex flex-1'>{currentItem}</div>
        )}
        {stepIndex === 0 ? (
          <div className='flex flex-col'>
            <div className='flex w-full justify-end  gap-1 mt-4'>
              <h1>Remember password? Sign in here</h1>
              <Link href='/login' className=' text-green-500'>
                Sign In.
              </Link>
            </div>
            <div className='mt-10 flex flex-col gap-3 w-full'>
              <Button onClick={verifyOtp} className='w-full'>
                Verify Email
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex w-full pb-8 justify-end'>
            <Button
              onClick={() => {
                if (stepIndex < 2) {
                  setStepIndex((step) => step + 1);
                } else {
                  signup();
                }
              }}
              className='flex flex-row gap-2 text-lg'
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
