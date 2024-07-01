'use client';
import React from 'react';
import { publishAndUnpublishAction } from '@/server/actions/lessons';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { showToast } from '@/utils/showToast';
import { Video, LayoutDashboard, ArrowLeftIcon } from 'lucide-react';
import LessonTitleForm from '../components/LessonTitleForm';
import LessonDescriptionForm from '../components/LessonDescriptionForm';
import PriceSWitchForm from '../components/PriceSwitchForm';
import VideoForm from '../components/VideoForm';

type LessonCreationSection = {
  lesson: any;
};

const LessonCreationSection = ({ lesson }: LessonCreationSection) => {
  const requiredFields = [lesson.title, lesson.descriptions, lesson.video];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = requiredFields.every(Boolean);

  const togglePublish = async () => {
    if (isCompleted) {
      try {
        const result = await publishAndUnpublishAction(lesson.id);
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
      }
    } else {
      showToast('warning', <p>You need to all the required fields</p>);
    }
  };

  return (
    <div className='flex sm:flex-row flex-col w-full gap-5 py-3 justify-center'>
      <div className='flex flex-col flex-1 gap-3'>
        <div className='flex items-center gap-2 h-8'>
          <LayoutDashboard />
          <h1 className='font-semibold text-sm '>
            Customize Your Lesson{' '}
            <span className=' text-xs text-slate-400'>
              Completed:{completedFields}/{totalFields}
            </span>
          </h1>
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
        <div className='flex items-center justify-between h-8'>
          <div className='flex gap-2'>
            <Video />
            <h1 className='font-semibold  text-sm'>Add Video</h1>
          </div>
          <div className='flex gap-2 items-center '>
            <Button
              disabled={!isCompleted}
              variant={lesson.isPublished ? 'secondary' : 'default'}
              onClick={togglePublish}
            >
              {lesson.isPublished ? 'Unpublish' : 'Publish'}
            </Button>
            <Button variant={'outline'}>
              <Trash2 />
            </Button>
          </div>
        </div>
        <VideoForm initialData={{ video: lesson.video }} lessonId={lesson.id} />
      </div>
    </div>
  );
};

export default LessonCreationSection;
