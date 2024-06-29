import React, { useEffect } from 'react';
import DynamicCard from '@/components/DynamicCard';
import { Video, LayoutDashboard, ArrowLeftIcon } from 'lucide-react';
import LessonTitleForm from '../../components/LessonTitleForm';
import LessonDescriptionForm from '../../components/LessonDescriptionForm';
import PriceSWitchForm from '../../components/PriceSwitchForm';
import VideoForm from '../../components/VideoForm';
import Link from 'next/link';
import { getLessonByIdAction } from '@/server/actions/lessons';

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
      <div className='flex sm:flex-row flex-col w-full gap-5 py-3 justify-center'>
        <div className='flex flex-col flex-1 gap-3'>
          <div className='flex items-center gap-2 mb-4'>
            <LayoutDashboard />
            <h1 className='font-semibold text-sm '>Customize Your Lesson</h1>
          </div>

          <div className='flex flex-col gap-4'>
            <LessonTitleForm
              initialData={{ title: lesson.title || '' }}
              lessonId={lesson.id}
            />
            <LessonDescriptionForm
              initialData={{ descriptions: lesson.descriptions || '' }}
              lessonId={lesson.id}
            />
            <PriceSWitchForm
              initialData={{ isFree: lesson.isFree }}
              lessonId={lesson.id}
            />
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-3'>
          <div className='flex items-center gap-2 mb-4'>
            <Video />
            <h1 className='font-semibold  text-sm'>Add Video</h1>
          </div>
          <VideoForm
            initialData={{ video: lesson.video }}
            lessonId={lesson.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EditLesson;
