'use client';
import React from 'react';
import { Settings } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

type CoursesTableProps = {
  courses: any[];
};

const CoursesTable = ({ courses }: CoursesTableProps) => {
  const router = useRouter();
  const AppRow = ({
    title,
    students,
    isPublished,
    level,
    id,
  }: {
    title: string;
    students: number;
    isPublished: boolean;
    level: string;
    id: number;
  }) => (
    <TableRow>
      <TableCell
        className=' cursor-pointer'
        onClick={() => {
          router.push(`/instructor-dashboard/manage-course/edit/${id}`);
        }}
      >
        {title}
      </TableCell>
      <TableCell className=''>
        <div className=' text-center'>{students}</div>
      </TableCell>
      <TableCell>
        <div className='flex  items-center gap-2 text-xs'>
          {isPublished ? (
            <h1 className=' p-2 bg-green-100 text-green-600 rounded-md'>
              Published
            </h1>
          ) : (
            <h1 className=' p-2 bg-red-100 text-red-600 rounded-md'>
              UnPublished
            </h1>
          )}
        </div>
      </TableCell>
      <TableCell className=''>
        <div>Medium</div>
      </TableCell>
      {/* <TableCell className=''>
            <h1>April 23, 2024 7:30am</h1>
          </TableCell> */}
      <TableCell className=' flex justify-center'>
        <Settings />
      </TableCell>
    </TableRow>
  );
  return (
    <Table className=''>
      <TableHeader>
        <TableRow className=' text-lg font-extrabold text-black'>
          <TableHead className=''>Course Name</TableHead>
          <TableHead className='text-center'>students</TableHead>
          <TableHead>status</TableHead>
          <TableHead className=''>Level</TableHead>
          {/* <TableHead className=''>Next Assignment</TableHead> */}
          <TableHead className=' text-center'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=''>
        {courses &&
          courses.map((item, index) => (
            <AppRow
              key={index}
              id={item.id}
              title={item.title}
              students={item.users.length}
              isPublished={item.isPublished}
              level='Medium'
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default CoursesTable;
