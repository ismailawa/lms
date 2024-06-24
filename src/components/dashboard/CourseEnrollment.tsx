import React from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';

const CourseEnrollment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex w-full border-2 border-gray-300 justify-center items-center py-2 hover:text-white text-sm bg-[#f8f8f8] hover:bg-green-600 text-black rounded-lg cursor-pointer'>
          Enroll Now
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Course Enrollment</DialogTitle>
        </DialogHeader>
        <div className='flex w-full'>
          {/* <Input
            placeholder='Course Title'
            className='w-full'
            type='text'
            value={}
            onChange={(e: any) => {}}
          /> */}
        </div>
        <DialogFooter>
          <div className='flex gap-2'>
            <Button
              className='w-fit bg-red-500 hover:bg-red-600 px-8 py-3'
              onClick={() => {}}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='w-fit bg-green-500 hover:bg-green-600 px-8 py-3'
              onClick={() => {}}
            >
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnrollment;
