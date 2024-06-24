import React from 'react';
import CustomInput from '../CustomInput';
import { useFormContext } from 'react-hook-form';
import { FormSchemaType } from '@/types';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

const SetPassword = ({ title, description }: any) => {
  const form = useFormContext<FormSchemaType>();
  return (
    <div className=' flex flex-col w-full flex-1 mt-16 gap-10'>
      <div className='flex flex-col gap-1'>
        <h1 className=' text-2xl font-bold'>{title}</h1>
        <p className=' text-xs'>{description}</p>
      </div>
      <div className=' flex flex-col gap-5'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  title='Password'
                  type='password'
                  placeholder='Enter your password'
                  {...field}
                />
              </FormControl>
              <div className='flex items-center justify-between'>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  title='Re-Enter password'
                  type='password'
                  placeholder='Enter your password'
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
    </div>
  );
};

export default SetPassword;
