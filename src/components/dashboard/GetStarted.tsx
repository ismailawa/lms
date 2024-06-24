import React from 'react';
import GetStartedCard from './GetStartedCard';
import AddCourseTitle from './AddCourseTitle';

const GetStarted = () => {
  return (
    <div className='flex flex-col gap-2 w-full sm:max-w-3xl  mx-auto'>
      <h1 className=' text-3xl font-semibold'>Get Started</h1>
      <p className=' text-gray-400'>
        With Mymakarata , learning is never a waste, spend your time wisely{' '}
        <br />
        and learn the tending technologies
      </p>
      <div className=' flex flex-col gap-4 my-4'>
        <GetStartedCard
          image='/images/create.png'
          title='Create engaging course'
          description='No matter if youre a seasoned educator or a newcomer to teaching,
            you have the potential to create an interesting and captivating
            course. Weve gathered a variety of resources and top strategies to
            support you in elevating your teaching, regardless of your current
            level of experience.'
          link='/'
        >
          {<AddCourseTitle />}
        </GetStartedCard>
        <GetStartedCard
          image='/images/createcomf.png'
          title='Get Started with video comference'
          description='Utilize our resources to grasp the fundamentals and elevate your course with top-notch video lectures, setting it apart from the rest.'
          link='/'
        />
        <GetStartedCard
          image='/images/build.png'
          title='Build your Audience '
          description='Ensure the success of your course by growing your audience strategically.'
          link='/'
        />
      </div>
    </div>
  );
};

export default GetStarted;
