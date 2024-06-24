'use client';
import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import CustomInput from '@/components/CustomInput';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useForm, useFormContext } from 'react-hook-form';
import {
  defaulEmailFormSchemaValue,
  EmailFormSchema,
  EmailFormSchemaType,
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
import { getTokenAction } from '@/server/actions/authentication';
import { showToast } from '@/utils/showToast';
import { RotatingLines } from 'react-loader-spinner';

function Signup() {
  const router = useRouter();
  const { setValues } = useFinalValue();
  const form = useForm<EmailFormSchemaType>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: defaulEmailFormSchemaValue,
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: EmailFormSchemaType) {
    setIsLoading(true);
    const result = await getTokenAction(values);

    if (result.success) {
      setValues({
        email: values.email,
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        otp: '',
      });
      showToast('success', <p>{result.message}</p>);
      router.push('/signup/otp');
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
        <div className='flex flex-col gap-2 mt-10'>
          <h1 className=' text-xl font-semibold'>Welcome to MyMakaranta 👋</h1>
          <p className=' text-sm text-gray-500'>Lets Get you started!.</p>
        </div>
        <Form {...form}>
          <form>
            <div className='flex flex-col w-full gap-4 mt-6 justify-center'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* <Input placeholder="e.g. Stephen King" {...field} /> */}

                      <CustomInput
                        title='Email'
                        placeholder='Email address'
                        {...field}
                      />
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
                'Continue with Email'
              )}
            </Button>
            <Button variant='outline' className='flex flex-row gap-2 w-full'>
              <div className=' w-5 h-5 relative'>
                <Image src={'/images/google.png'} alt='' fill />
              </div>
              Continue with Google
            </Button>
          </div>
          <div className='flex w-full justify-center  gap-1 mt-4'>
            <h1>Already have an account?</h1>{' '}
            <Link href='/login' className=' text-green-500'>
              Sign In.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
