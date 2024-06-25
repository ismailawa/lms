'use client';
import React, { useEffect, useState } from 'react';
import DynamicCard from '@/components/DynamicCard';
import { Button } from '@/components/ui/button';
import { Trash2, DollarSign, Paperclip } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getCourseAction } from '@/server/actions/courses';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});

type EditFormProps = {
  data: any;
};
const EditForm = ({ data }: EditFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.data.title ?? '',
      description: data.data.description ?? '',
      category: data.data.category ?? '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex sm:flex-row flex-col w-full gap-5 py-3 justify-center'>
            <div className='flex flex-col flex-1 gap-3'>
              <h1 className='font-semibold text-sm mb-4'>
                Customize Your Course
              </h1>
              <div className='flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DynamicCard
                          inputType='text'
                          title='Course Title'
                          placeholder='Enter Course Title'
                          {...field}
                          // onSubmit={(value) => {
                          //   console.log(value);
                          // }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DynamicCard
                          inputType='text-area'
                          title='description'
                          placeholder='Enter description'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DynamicCard
                  inputType='image'
                  title='image'
                  placeholder='Enter image'
                  onSubmit={(value) => {
                    console.log(value);
                  }}
                />

                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DynamicCard
                          inputType='select'
                          title='category'
                          placeholder='Enter category'
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex flex-col flex-1 gap-3'>
              <div className='flex w-full justify-between items-center'>
                <h1 className='font-semibold  text-sm'>Course Lessons</h1>
                <div className='flex gap-4 items-center '>
                  <Button variant={'outline'}>Publish</Button>
                  <Button variant={'outline'}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
              <DynamicCard
                inputType='add-lesson'
                title='lessons'
                placeholder='lessons'
                onSubmit={(value) => {
                  console.log(value);
                }}
              />
              <div className='flex items-center mt-5 gap-3'>
                <div className='p-2 border rounded-full border-green-600'>
                  <DollarSign size={16} />
                </div>
                <h1 className=' font-semibold'>Sell your course</h1>
              </div>
              <DynamicCard
                inputType='text'
                pattern='^\$\d{1,3}(,\d{3})*(\.\d+)?$'
                title='Course Price'
                placeholder='N 3,000.00'
                onSubmit={(value) => {
                  console.log(value);
                }}
              />
              <div className='flex items-center mt-5 gap-3'>
                <div className='p-2 border rounded-full border-green-600'>
                  <Paperclip size={16} />
                </div>
                <h1 className=' font-semibold'>Resources and Attachments</h1>
              </div>
              <DynamicCard
                inputType='add-file'
                title='Resources and Attachments'
                placeholder='Resources and Attachments'
                onSubmit={(value) => {
                  console.log(value);
                }}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
