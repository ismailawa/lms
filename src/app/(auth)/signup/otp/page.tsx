'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';

import {
  defaultOTPFormSchemaValue,
  OTPFormSchema,
  OTPFormSchemaType,
} from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useFinalValue } from '@/context/FinalValueContextProvider';
import { showToast } from '@/utils/showToast';
import {
  getTokenAction,
  verifyTokenAction,
} from '@/server/actions/authentication';

const Otp = () => {
  const router = useRouter();
  const { setValues, values } = useFinalValue();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OTPFormSchemaType>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: defaultOTPFormSchemaValue,
  });

  async function onSubmit(payload: OTPFormSchemaType) {
    setIsLoading(true);
    try {
      const result = await verifyTokenAction({
        ...payload,
        email: values.email,
      });

      if (result.success) {
        setValues({
          email: values.email,
          password: '',
          username: '',
          firstName: '',
          lastName: '',
          confirmPassword: '',
          otp: payload.otp,
        });
        showToast('success', <p>{result.message}</p>);
        router.push('/signup/steps');
      } else {
        showToast('error', <p>{result.message}</p>);
      }
    } catch (error) {
      showToast('error', <p>Ooops something went wrong</p>);
    } finally {
      setIsLoading(false);
    }
  }

  async function resendToken() {
    setIsLoading(true);
    const result = await getTokenAction(values);

    if (result.success) {
      showToast('success', <p>{result.message}</p>);
    } else {
      showToast('error', <p>{result.message}</p>);
    }
    setIsLoading(false);
  }

  return (
    <div className='flex flex-col justify-center items-center sm:pt-20 pt-10 w-full sm:px-28 px-6 h-full'>
      <div className='flex flex-col w-full h-full'>
        <div className='w-[203px] h-[40px] relative'>
          <Image src={'/images/logo1.png'} alt='' fill />
        </div>

        <div className='flex flex-col w-full gap-4 mt-6 justify-center'>
          <div className=' flex flex-col w-full mt-16 gap-10'>
            <div className='flex flex-col gap-1'>
              <h1 className=' text-2xl font-bold'>
                Enter verification code <br /> sent to your email
              </h1>
              <p className=' text-xs'>
                Enter the code we sent to {values.email} to continue
              </p>
            </div>
            <div className=' flex flex-col w-full items-center'>
              <Form {...form}>
                <form>
                  <div className='flex flex-col w-full gap-4 mt-6 justify-center'>
                    <FormField
                      control={form.control}
                      name='otp'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              {...field}
                              onComplete={async (value: string) => {
                                const result = await form.trigger(['otp'], {
                                  shouldFocus: true,
                                });
                                if (result) onSubmit({ otp: value });
                              }}
                              containerClassName='flex gap-8'
                            >
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTP>
                          </FormControl>
                          <div className='flex items-center justify-between'>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
            <p className=' text-sm'>
              Having trouble?{' '}
              <span
                className=' text-green-600 font-semibold cursor-pointer'
                onClick={resendToken}
              >
                Resend OTP
              </span>
            </p>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='mt-10 flex flex-col gap-3 w-full'>
            <Button onClick={form.handleSubmit(onSubmit)} className='w-full'>
              {isLoading ? (
                <RotatingLines
                  visible={isLoading}
                  height='30'
                  width='30'
                  color='white'
                  strokeWidth='5'
                  animationDuration='0.75'
                  ariaLabel='rotating-lines-loading'
                />
              ) : (
                'Verify'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
