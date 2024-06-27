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
import { createCourse } from '@/server/actions/courses';
import { showToast } from '@/utils/showToast';
import { RotatingLines } from 'react-loader-spinner';
import { createCategoryAction } from '@/server/actions/categories';

const CreateCategory = ({
  title = 'Create New Category',
}: {
  title?: string;
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await createCategoryAction({ title: inputValue });
      console.log(result);

      if (result.success) {
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
        <Button variant={'outline'} className='w-full'>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <div className='flex w-full'>
          <Input
            placeholder='Category Title'
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
              'Create Category'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
