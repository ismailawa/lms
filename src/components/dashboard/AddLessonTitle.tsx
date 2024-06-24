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
import { FilePlus } from 'lucide-react';

const AddLessonTitle = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const router = useRouter();

  const handleSubmit = () => {
    // TODO: Create lesson
    const id = 1;
    router.push(`/manage-course/lessons/${id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilePlus size={15} className=' cursor-pointer' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Lesson Title</DialogTitle>
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
            className='w-full bg-green-500 hover:bg-green-600 px-8 py-2'
            onClick={handleSubmit}
          >
            Create Lesson
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonTitle;
