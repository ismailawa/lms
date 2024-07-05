'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon, Trash2, ImageIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { CloudUpload } from 'lucide-react';
import Image from 'next/image';
import { updateCourse } from '@/server/actions/courses';
import { showToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  resources: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      secureUrl: z.string(),
      thumbnail: z.string(),
      signature: z.string(),
      format: z.string(),
      width: z.number(),
      height: z.number(),
      type: z.string(),
      assetId: z.string(),
      publicId: z.string(),
    })
  ),
});

type ImageFormProps = {
  initialData: {
    resources: [{}];
  };
  courseId: string;
};

const ResourcesForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSuccess = async (
    results: CloudinaryUploadWidgetResults,
    widget: any
  ) => {
    try {
      const result = await updateCourse(courseId, {
        resources: (results.info as any).files.map((im: any) => ({
          id: im.id,
          url: im.uploadInfo.url,
          secureUrl: im.uploadInfo.secure_url,
          thumbnail: im.uploadInfo.thumbnail_url,
          format: im.uploadInfo.format,
          width: im.uploadInfo.width,
          height: im.uploadInfo.height,
          type: im.uploadInfo.resource_type,
          assetId: im.uploadInfo.asset_id,
          publicId: im.uploadInfo.public_id,
          signature: im.uploadInfo.signature,
        })),
      });
      if (result.success) {
        showToast('success', <p>{result.message}</p>);
        setIsEditting((v) => !v);
        router.refresh();
      } else {
        showToast('error', <p>{result.message}</p>);
      }
    } catch (error) {
      showToast(
        'error',
        <p>Ooops something went wrong, please try again later</p>
      );
    }
  };

  return (
    <div className='flex flex-col w-full gap-2 bg-[#f8f8f8] border-4 border-solid border-white p-4 rounded-xl'>
      <div className='flex justify-between w-full items-center'>
        <h1 className=' text-sm'>Course Resources</h1>
        <Button
          variant={'ghost'}
          onClick={() => {
            setIsEditting((v) => !v);
          }}
        >
          {!isEditting ? (
            <>
              <PencilIcon size={15} className=' cursor-pointer mr-2' />
              Edit Resources
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div className='my-1'>
        <Separator />
      </div>
      <div className=' my-2 min-h-[200px]'>
        {isEditting && (
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name='resources'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex justify-center items-center w-full min-h-[300px]  rounded-md relative '>
                        {isEditting && (
                          <CldUploadWidget
                            options={{
                              sources: ['local'],
                              multiple: true,
                              maxFiles: 5,
                              resourceType: 'image',
                            }}
                            // onSuccess={onSuccess}
                            onError={(error, options) => {
                              console.log(error);
                            }}
                            // onShowCompleted={onComplete}
                            onQueuesEnd={onSuccess}
                            uploadPreset='mymakaranta_preset'
                          >
                            {({ open }) => {
                              return (
                                <div
                                  onClick={() => {
                                    try {
                                      open();
                                    } catch (error) {
                                      showToast(
                                        'error',
                                        <p>Ooops something went wrong</p>
                                      );
                                    }
                                  }}
                                  className='flex flex-col w-full justify-center items-center gap-2 cursor-pointer'
                                >
                                  <CloudUpload size={30} />
                                  <p>click to select file</p>
                                </div>
                              );
                            }}
                          </CldUploadWidget>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}

        {!isEditting && (
          <div>
            {initialData.resources.length > 0 ? (
              <div className='flex flex-col w-full gap-1 min-h-[300px]'>
                {initialData?.resources.map((file: any, index) => (
                  <div
                    className='flex w-full items-center justify-between gap-2 bg-white p-2 rounded-md'
                    key={index}
                  >
                    <div className='flex items-center w-[50px] h-[50px] relative border border-green-600 rounded-md overflow-hidden'>
                      <Image
                        src={file?.thumbnail}
                        alt='images'
                        height={file.height}
                        width={file.width}
                      />
                    </div>
                    <p className=' text-xs'>{file?.id}</p>
                    <Trash2 className=' text-gray-400' size={20} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col justify-center  items-center w-full min-h-[300px]   rounded-md'>
                <ImageIcon size={50} className='text-gray-500' />
                <p className='text-sm text-gray-500'>No resources available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesForm;
