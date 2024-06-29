'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusIcon } from 'lucide-react';
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
import {
  createLesson,
  updateCourse,
  updateReOrderAction,
} from '@/server/actions/courses';
import { showToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';
import LessonList from './LessonList';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Course title is required' }),
});

type LessonFormProps = {
  initialData: {
    title: string;
  };
  courseId: string;
  lessons: any[];
};

const LessonForm = ({ initialData, courseId, lessons }: LessonFormProps) => {
  const [isUpdating, setIsUpating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const updateReOrder = async (payload: any) => {
    setIsCreating(true);
    try {
      const result = await updateReOrderAction(+courseId, payload);
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
    } finally {
      setIsCreating(false);
    }
  };

  const onEdit = (id: number) => {
    router.push(`/instructor-dashboard/manage-course/lessons/${id}`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createLesson(
        values.title,
        +courseId,
        lessons.length + 1
      );
      if (result.success) {
        showToast('success', <p>{result.message}</p>);
        setIsUpating((v) => !v);
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
    <div className=' relative flex flex-col w-full gap-2 bg-white p-4'>
      {isCreating && (
        <div className='flex items-center justify-center absolute inset-0 bg-slate-700/20'>
          <Loader2 className=' animate-spin h-6 w-6 text-sky-700' />
        </div>
      )}
      <div className='flex justify-between w-full items-center'>
        <h1 className=' text-sm'>Create Lesson</h1>
        <Button
          variant={'ghost'}
          onClick={() => {
            setIsUpating((v) => !v);
          }}
        >
          {!isUpdating ? (
            <>
              <PlusIcon size={15} className=' cursor-pointer mr-2' />
              Create
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
        {isUpdating && (
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
                        placeholder='eg. Introdution to software dev'
                        className={`${isUpdating ? 'bg-[#fefefe]' : ''}`}
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
        {!isUpdating && (
          <LessonList
            onEdit={onEdit}
            onReOrder={updateReOrder}
            lessons={lessons}
          />
        )}
      </div>
    </div>
  );
};

export default LessonForm;
