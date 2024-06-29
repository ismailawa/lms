import { getCourseAction } from '@/server/actions/courses';
import CourseFormSection from '../../components/CourseFormSection';
import { getCategoriesAction } from '@/server/actions/categories';

const Edit = async ({ params }: { params: any }) => {
  const data = await getCourseAction(params.id);
  const categories = await getCategoriesAction();

  return (
    <div className='flex flex-col gap-14 sm:max-w-5xl mx-auto w-full '>
      <h1 className=' text-2xl font-bold'>Course Creation</h1>
      <CourseFormSection data={data} categories={categories} />
    </div>
  );
};

export default Edit;
