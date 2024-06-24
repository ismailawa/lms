'use client';
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import CustomInput from '../CustomInput';
import { useFormContext } from 'react-hook-form';
import { FormSchemaType } from '@/types';

const UserInformmation = () => {
  const form = useFormContext<FormSchemaType>();
  return (
    <div className=' flex flex-col w-full flex-1 mt-16 gap-10'>
      <div className='flex flex-col gap-1'>
        <h1 className=' text-2xl font-bold'>Please enter your information</h1>
        <p className=' text-xs'>
          Complete your details so we can give you the best experience
        </p>
      </div>
      <div className=' flex flex-col gap-5'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  title='Username'
                  placeholder='Username'
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
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <Input placeholder="e.g. Stephen King" {...field} /> */}
                <CustomInput
                  title='FirstName'
                  placeholder='FirstName'
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
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <Input placeholder="e.g. Stephen King" {...field} /> */}
                <CustomInput
                  title='lastName'
                  placeholder='LastName'
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

export default UserInformmation;
