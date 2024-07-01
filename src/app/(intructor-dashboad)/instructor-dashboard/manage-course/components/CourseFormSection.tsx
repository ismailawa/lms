'use client';
import React, { useEffect, useState } from 'react';
import DynamicCard from '@/components/DynamicCard';
import { Button } from '@/components/ui/button';
import { Trash2, DollarSign, Paperclip } from 'lucide-react';
import TitleForm from './TitleForm';
import DescriptionForm from './DescriptionForm';
import CategoryForm from './CategoryForm';
import PriceForm from './PriceForm';
import ImageForm from './ImageForm';
import ResourcesForm from './ResourcesForm';
import LessonForm from './LessonForm';
import { showToast } from '@/utils/showToast';
import { publishAndUnpublishCourseAction } from '@/server/actions/courses';

type CourseFormSectionProps = {
  data: any;
  categories?: any;
};
const CourseFormSection = ({ data, categories }: CourseFormSectionProps) => {
  if (!data) {
    return null;
  }
  const requiredFields = [
    data.data.title,
    data.data.descriptions,
    data.data.price,
    data.data.cover,
    data?.data?.category,
    data?.data?.lessons.some((course: any) => course.isPublished),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = requiredFields.every(Boolean);

  const togglePublish = async () => {
    if (isCompleted) {
      try {
        const result = await publishAndUnpublishCourseAction(data.data.id);
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
    <div className='flex sm:flex-row flex-col w-full gap-5 justify-center'>
      <div className='flex flex-col w-1/2  gap-3'>
        <div className='flex w-full items-center h-8'>
          <h1 className='font-semibold text-sm'>
            Customize Your Course -{' '}
            <span className=' text-xs text-slate-400'>
              Completed:{completedFields}/{totalFields}
            </span>
          </h1>
        </div>
        <div className='flex flex-col gap-4'>
          <TitleForm
            initialData={{ title: data.data.title ?? '' }}
            courseId={data.data.id}
          />

          <DescriptionForm
            initialData={{ descriptions: data?.data?.descriptions ?? '' }}
            courseId={data.data.id}
          />

          <ImageForm
            initialData={{ cover: data.data.cover }}
            courseId={data.data.id}
          />

          <CategoryForm
            initialData={{ categoryId: `${data?.data?.category?.id}` ?? '' }}
            courseId={data.data.id}
            options={categories}
          />
        </div>
      </div>
      <div className='flex flex-col items-center  w-1/2 gap-3'>
        <div className='flex w-full justify-between items-center h-8'>
          <h1 className='font-semibold  text-sm'>Course Lessons</h1>
          <div className='flex gap-4 items-center '>
            <Button
              disabled={!isCompleted}
              variant={data.data.isPublished ? 'secondary' : 'default'}
              onClick={togglePublish}
            >
              {data.data.isPublished ? 'Unpublish' : 'Publish'}
            </Button>
            <Button variant={'outline'}>
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <LessonForm
            initialData={{ title: '' }}
            courseId={data.data.id}
            lessons={data?.data?.lessons}
          />
          <div className='flex items-center mt-5 gap-3'>
            <div className='p-2 border rounded-full border-green-600'>
              <DollarSign size={16} />
            </div>
            <h1 className=' font-semibold'>Sell your course</h1>
          </div>
          <PriceForm
            initialData={{ price: data.data.price ?? '' }}
            courseId={data.data.id}
          />
          <div className='flex items-center mt-5 gap-3'>
            <div className='p-2 border rounded-full border-green-600'>
              <Paperclip size={16} />
            </div>
            <h1 className=' font-semibold'>Resources and Attachments</h1>
          </div>
          <ResourcesForm
            initialData={{ resources: data.data.resources ?? [] }}
            courseId={data.data.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseFormSection;
