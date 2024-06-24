'use client';
import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { createCourse } from '@/server/actions/courses';
import { showToast } from '@/utils/showToast';
import { RotatingLines } from 'react-loader-spinner';

const AddCourseTitle = ({ title = 'Get Started' }: { title?: string }) => {
  const [inputValue, setInputValue] = useState<string>('New Course Title');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await createCourse(inputValue);
      if (result.success) {
        router.push(`/manage-course/edit/${result.data.id}`);
        showToast('success', <p>{result.message}</p>);
      } else {
        showToast('error', <p>{result.message}</p>);
      }
    } catch (error) {
      showToast('error', <p>Ooops something went wrong try again later</p>);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full sm:w-fit'>{title}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Course Title</DialogTitle>
        </DialogHeader>
        <div className='flex w-full'>
          <Input
            placeholder='Course Title'
            className='w-full'
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            type='submit'
            disabled={inputValue === '' || inputValue.length < 6}
            className='w-full bg-green-500 hover:bg-green-600 px-8 py-2'
            onClick={handleSubmit}
          >
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
              'Create Course'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseTitle;
