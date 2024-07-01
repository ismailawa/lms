import React, { useState } from 'react';
import '@smastrom/react-rating/style.css';
import 'react-step-progress-bar/styles.css';
import CourseDetailsSection from '../components/CourseDetailsSection';
import CoursePlaylistSection from '../components/CoursePlaylistSection';
import {
  getAllPublishedCourseLessons,
  getCourseAction,
} from '@/server/actions/courses';

const CourseDetails = async ({ params }: { params: { id: string } }) => {
  const courses = getCourseAction(params.id);
  const lessons = getAllPublishedCourseLessons(params.id);
  const result = await Promise.all([courses, lessons]);

  return (
    <div className='flex gap-3 m-2'>
      <CourseDetailsSection course={result[0].data} />
      <CoursePlaylistSection lessons={result[1].data.lessons} />
    </div>
  );
};

export default CourseDetails;
