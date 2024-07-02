'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CustomInput from '@/components/CustomInput';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/server/actions/authentication';
import { showToast } from '@/utils/showToast';
import { RotatingLines } from 'react-loader-spinner';
import { setAuthCookie } from '@/lib/cookies';

const formSchema = z.object({
  email: z.string().email({ message: 'Email must be at least 2 characters.' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await loginAction(values);
      if (result.success) {
        showToast('success', <p>{result.message}</p>);
        router.push('/student-dashboard');
        form.reset();
      } else {
        showToast('error', <p>{result.message}</p>);
      }
    } catch (error) {
      showToast('error', <p>Ooops something went wrong try again later</p>);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-center items-center w-full h-full sm:pt-20 pt-10 sm:px-28 px-6'>
          <div className='flex flex-col w-full  h-full'>
            <div className='w-[203px] h-[40px] relative'>
              <Image src={'/images/logo1.png'} alt='' fill />
            </div>
            <div className='flex flex-col gap-2 mt-10'>
              <h1 className=' text-xl font-semibold'>Welcome Back 👋</h1>
              <p className=' text-sm text-gray-500'>
                Enter your login details to start learning.
              </p>
            </div>
            <div className='flex flex-col w-full gap-4 mt-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        title='Email'
                        placeholder='Enter your Email address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        title='Password'
                        type='password'
                        placeholder='Enter your Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=' flex w-full justify-end mt-3'>
              <Link
                href={'/forgot-password'}
                className=' text-sm text-green-500'
              >
                Forgot passsword?
              </Link>
            </div>
            <div className='mt-10 flex flex-col gap-3 w-full'>
              <Button className=' w-full'>
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
                  'Login'
                )}
              </Button>

              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}>
                <Button
                  variant='outline'
                  className='flex flex-row gap-2 w-full'
                >
                  <div className=' w-5 h-5 relative'>
                    <Image src={'/images/google.png'} alt='' fill />
                  </div>
                  Continue with Google
                </Button>
              </Link>
            </div>
            <div className='flex w-full justify-center  gap-1 mt-4'>
              <h1>Don&apos;t have an account?</h1>{' '}
              <Link href='/signup' className=' text-green-500'>
                Sign Up.
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Login;
