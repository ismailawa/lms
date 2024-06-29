import React, { useEffect } from 'react';
import { Video, LayoutDashboard, ArrowLeftIcon } from 'lucide-react';
import LessonTitleForm from '../../components/LessonTitleForm';
import LessonDescriptionForm from '../../components/LessonDescriptionForm';
import PriceSWitchForm from '../../components/PriceSwitchForm';
import VideoForm from '../../components/VideoForm';
import Link from 'next/link';
import {
  getLessonByIdAction,
  publishAndUnpublishAction,
} from '@/server/actions/lessons';
import LessonCreationSection from '../LessonCreationSection';

const EditLesson = async ({ params }: { params: { id: string } }) => {
  const lesson = await getLessonByIdAction(+params.id);
  console.log(lesson);

  return (
    <div className='flex flex-col gap-4 sm:max-w-5xl  mx-auto w-full'>
      <Link
        href={`/instructor-dashboard/manage-course/edit/${lesson.courseId}`}
      >
        <div className='flex gap-2'>
          <ArrowLeftIcon />
          <h1>Back to Course</h1>
        </div>
      </Link>

      <h1 className=' text-2xl font-bold'>Lesson Creation</h1>
      <LessonCreationSection lesson={lesson} />
    </div>
  );
};

export default EditLesson;
