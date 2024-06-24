import { Edit2Icon, FilePlus } from 'lucide-react';
import React from 'react';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';
import AddLessonTitle from './dashboard/AddLessonTitle';

const DynamicInputWrapper = ({
  title,
  isEditting,
  children,
  toggle,
  submit,
  type,
}: {
  title: string;
  isEditting: boolean;
  toggle: () => void;
  submit?: () => void;
  type?:
    | 'text'
    | 'text-area'
    | 'image'
    | 'select'
    | 'add-lesson'
    | 'add-file'
    | 'switch'
    | 'video';
  children: React.ReactNode;
}) => {
  return (
    <div className='flex flex-col w-full gap-2 bg-white p-4'>
      <div className='flex justify-between w-full'>
        <h1 className=' text-sm'>{title}</h1>
        {!isEditting && type !== 'add-lesson' && type !== 'add-file' && (
          <Edit2Icon size={15} className=' cursor-pointer' onClick={toggle} />
        )}
        {!isEditting && type === 'add-lesson' && <AddLessonTitle />}
        {!isEditting && type === 'add-file' && (
          <FilePlus size={15} className=' cursor-pointer' onClick={toggle} />
        )}
      </div>

      <div className='mb-3'>
        <Separator />
      </div>
      {children}
      {isEditting && (
        <div className='flex justify-between w-full text-sm mt-2'>
          <div
            onClick={toggle}
            className='flex justify-center items-center bg-red-500 px-2 py-1 text-white min-w-[80px] rounded-sm cursor-pointer'
          >
            Cancel
          </div>
          <div
            onClick={submit}
            className='flex justify-center items-center bg-green-500 px-2 py-1 text-white  min-w-[80px] rounded-sm cursor-pointer'
          >
            Save
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicInputWrapper;
