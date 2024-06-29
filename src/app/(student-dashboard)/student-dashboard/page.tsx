import CourseCard from '@/components/dashboard/CourseCard';
import { Progress } from '@/components/ui/progress';
import {
  BookCopy,
  BriefcaseBusiness,
  GraduationCap,
  Settings,
  Star,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import React from 'react';
import Image from 'next/image';
import { getAllPublishedCourses } from '@/server/actions/courses';
import RecomendationSection from '../components/RecomendationSection';

const StudentDashboard = async () => {
  const publishedCourses = await getAllPublishedCourses();

  const AppRow = () => (
    <TableRow>
      <TableCell className=''>Introduction to software</TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          <div className=' relative w-6 h-6 rounded-full bg-slate-400'>
            <Image src='/images/build.png' alt='' fill />
          </div>
          <h1>Ismailawa Aliyu</h1>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex  items-center gap-2 w-36'>
          <Progress value={60} className=' h-2 bg-slate-300' color='green' />
          <h1>60%</h1>
        </div>
      </TableCell>
      <TableCell className=''>
        <div>Medium</div>
      </TableCell>
      {/* <TableCell className=''>
        <h1>April 23, 2024 7:30am</h1>
      </TableCell> */}
      <TableCell className=''>
        <Settings />
      </TableCell>
    </TableRow>
  );
  return (
    <div className=' flex flex-col w-full gap-5'>
      <div className='flex gap-5 w-full'>
        <div className='flex flex-1  bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
          <Table className=''>
            <TableHeader>
              <TableRow>
                <TableHead className=''>Course Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className=''>Level</TableHead>
                {/* <TableHead className=''>Next Assignment</TableHead> */}
                <TableHead className=''>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=' h-96'>
              <AppRow />
              <AppRow />
              <AppRow />
              <AppRow />
              <AppRow />
            </TableBody>
          </Table>
        </div>
        <div className='flex flex-col w-60  p-5 rounded-2xl border-4 bg-[#f8f8f8] border-solid border-white gap-4'>
          <div className='flex items-center gap-3 bg-white p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-blue-300'>
              <GraduationCap color='white' size='30' />
            </div>
            <div className='flex flex-col'>
              <h1 className=' text-sm font-semibold'>24 Courses</h1>
              <p className=' text-xs'>Enrolled</p>
            </div>
          </div>
          <div className='flex items-center gap-3 bg-white p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-green-300'>
              <BookCopy color='white' size='30' />
            </div>
            <div className='flex flex-col'>
              <h1 className=' text-sm font-semibold'>56 Lessons</h1>
              <p className=' text-xs'>Contained</p>
            </div>
          </div>
          <div className='flex items-center gap-3 bg-white p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-orange-300'>
              <Star color='white' size='30' />
            </div>
            <div className='flex flex-col'>
              <h1 className=' text-sm font-semibold'>12 Certificates</h1>
              <p className=' text-xs'>Recieved</p>
            </div>
          </div>
          <div className='flex items-center gap-3 bg-white p-4'>
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-red-300'>
              <BriefcaseBusiness color='white' size='30' />
            </div>
            <div className='flex flex-col'>
              <h1 className=' text-sm font-semibold'>24 Courses</h1>
              <p className=' text-xs'>Completed</p>
            </div>
          </div>
        </div>
      </div>
      <RecomendationSection data={publishedCourses} />
    </div>
  );
};

export default StudentDashboard;
