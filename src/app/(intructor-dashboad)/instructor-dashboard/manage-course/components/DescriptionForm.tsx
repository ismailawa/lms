'use client';
import React, { useEffect, useState } from 'react';
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
import { updateCourse } from '@/server/actions/courses';
import { showToast } from '@/utils/showToast';
import Editor from './Editor';
import Preview from './Preview';

const formSchema = z.object({
  descriptions: z.string().min(3, { message: 'Course title is required' }),
});

type DescriptionFormProps = {
  initialData: {
    descriptions: string;
  };
  courseId: string;
};

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditting, setIsEditting] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await updateCourse(courseId, values);
      if (result.success) {
        setIsEditting((v) => !v);
        showToast('success', <p>{result.message}</p>);
        form.reset();
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

  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex flex-col w-full gap-1 bg-white p-4 min-h-[200px]'>
      <div className='flex justify-between w-full items-center'>
        <h1 className=' text-sm'>Course Description</h1>
        <Button
          variant={'ghost'}
          onClick={() => {
            setIsEditting((v) => !v);
          }}
        >
          {!isEditting ? (
            <>
              <PencilIcon size={15} className=' cursor-pointer mr-2' />
              Edit Description
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div className='my-1'>
        <Separator />
      </div>
      <div className='flex flex-col justify-center items-center h-full'>
        {isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='descriptions'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                className='flex justify-center items-center bg-green-500 px-2 py-1 text-white  min-w-[80px] rounded-sm cursor-pointer'
              >
                Save
              </Button>
            </form>
          </Form>
        )}
        {!isEditting && (
          <div className='flex  w-full h-full'>
            {initialData.descriptions ? (
              <Preview value={initialData.descriptions} />
            ) : (
              <div className='flex w-full h-full justify-center items-center '>
                <h1 className=' items-center'>No Description</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionForm;
