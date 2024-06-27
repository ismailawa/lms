'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2Icon, PencilIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateCourse } from '@/server/actions/courses';
import { showToast } from '@/utils/showToast';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Course title is required' }),
});

type TitleFormProps = {
  initialData: {
    title: string;
  };
  courseId: string;
};

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await updateCourse(courseId, values);
      if (result.success) {
        showToast('success', <p>{result.message}</p>);
      } else {
        showToast('error', <p>{result.message}</p>);
      }
    } catch (error) {
      showToast(
        'error',
        <p>Ooops something went wrong, please try again later</p>
      );
    }
  };

  return (
    <div className='flex flex-col w-full gap-2 bg-white p-4'>
      <div className='flex justify-between w-full items-center'>
        <h1 className=' text-sm'>Course Title</h1>
        <Button
          variant={'ghost'}
          onClick={() => {
            setIsEditting((v) => !v);
          }}
        >
          {!isEditting ? (
            <>
              <PencilIcon size={15} className=' cursor-pointer mr-2' />
              Edit title
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div className='my-1'>
        <Separator />
      </div>
      <div className=' my-2'>
        {isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className={`${isEditting ? 'bg-[#fefefe]' : ''}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between w-full text-sm mt-5'>
                <Button
                  type='submit'
                  disabled={!isValid || isSubmitting}
                  className='flex justify-center items-center bg-green-500 px-2 py-1 text-white  min-w-[80px] rounded-sm cursor-pointer'
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
        {!isEditting && (
          <p className='p-2 text-sm font-semibold'>{initialData.title}</p>
        )}
      </div>
    </div>
  );
};

export default TitleForm;
