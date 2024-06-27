'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { CldUploadWidget } from 'next-cloudinary';
import { CloudUpload } from 'lucide-react';

const formSchema = z.object({
  videoUrl: z.string(),
});

type VideoFormProps = {
  initialData: {
    videoUrl: string;
  };
  courseId: string;
};

const VideoForm = ({ initialData, courseId }: VideoFormProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <div className='flex flex-col w-full gap-2 bg-white p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-between w-full'>
            <h1 className=' text-sm'>Course Video</h1>
            <Button
              variant={'ghost'}
              onClick={() => {
                setIsEditting(!isEditting);
              }}
            >
              <PencilIcon size={15} className=' cursor-pointer mr-2' />
              Edit Video
            </Button>
          </div>
          <div className='my-3'>
            <Separator />
          </div>
          <div className=' my-3'>
            <FormField
              control={form.control}
              name='videoUrl'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex justify-center items-center w-full h-[200px]  rounded-md relative '>
                      <CldUploadWidget
                        options={{
                          // sources: ['local'],
                          multiple: false,
                          maxFiles: 1,
                          resourceType: 'video',
                        }}
                        onSuccess={(results, options) => {
                          console.log(results.info);
                          //   setFile(results.info);
                        }}
                        onError={(error, options) => {
                          console.log(error);
                        }}
                        uploadPreset='mymakaranta_preset'
                      >
                        {({ open }) => {
                          return (
                            <div className='flex flex-col justify-center items-center gap-4 text-sm'>
                              <CloudUpload size={30} />
                              <Button variant='outline' onClick={() => open()}>
                                Upload Video
                              </Button>
                            </div>
                          );
                        }}
                      </CldUploadWidget>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isEditting && (
            <div className='flex justify-between w-full text-sm mt-2'>
              <div
                onClick={() => {
                  setIsEditting(!isEditting);
                }}
                className='flex justify-center items-center bg-red-500 px-2 py-1 text-white min-w-[80px] rounded-sm cursor-pointer'
              >
                Cancel
              </div>
              <div
                onClick={() => {}}
                className='flex justify-center items-center bg-green-500 px-2 py-1 text-white  min-w-[80px] rounded-sm cursor-pointer'
              >
                Save
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default VideoForm;
