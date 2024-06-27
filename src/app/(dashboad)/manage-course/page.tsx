import React from 'react';
import CoursesTable from './components/CoursesTable';
import { getInstructorsCourse } from '@/server/actions/courses';
import AddCourseTitle from '@/components/dashboard/AddCourseTitle';
import { getCategoriesAction } from '@/server/actions/categories';

const Courses = async () => {
  const data = await getInstructorsCourse();

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-col  bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
          <div className='flex w-full justify-end mb-3'>
            <AddCourseTitle title='Create Course' />
          </div>
          <CoursesTable courses={data.data.courses} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
