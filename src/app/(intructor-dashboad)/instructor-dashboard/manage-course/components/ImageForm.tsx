'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon, ImageIcon } from 'lucide-react';
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
import dynamic from 'next/dynamic';

const formSchema = z.object({
  cover: z.object({
    id: z.string(),
    url: z.string(),
    secureUrl: z.string(),
    signature: z.string(),
    format: z.string(),
    width: z.number(),
    height: z.number(),
    type: z.string(),
    assetId: z.string(),
    publicId: z.string(),
  }),
});

type ImageFormProps = {
  initialData: {
    cover:
      | {
          id: string;
          url: string;
          secureUrl: string;
          format: string;
          signature: string;
          width: number;
          height: number;
          type: string;
          assetId: string;
          publicId: string;
        }
      | undefined;
  };
  courseId: string;
};

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
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
        cover: {
          id: (results?.info as any).id,
          url: (results?.info as any).url,
          secureUrl: (results?.info as any).secure_url,
          format: (results?.info as any).format,
          width: (results?.info as any).width,
          height: (results?.info as any).height,
          type: (results?.info as any).resource_type,
          assetId: (results?.info as any).asset_id,
          publicId: (results?.info as any).public_id,
          signature: (results?.info as any).signature,
        },
      });
      if (result.success) {
        showToast('success', <p>{result.message}</p>);
        setIsEditting((v) => !v);
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

  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex flex-col w-full gap-2 bg-[#f8f8f8] border-4 border-solid border-white p-4 rounded-xl'>
      <div className='flex justify-between w-full items-center'>
        <h1 className=' text-sm'>Course Cover Image</h1>
        <Button
          variant={'ghost'}
          onClick={() => {
            setIsEditting((v) => !v);
          }}
        >
          {!isEditting ? (
            <>
              <PencilIcon size={15} className=' cursor-pointer mr-2' />
              Edit Cover Image
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div className='my-1'>
        <Separator />
      </div>
      <div className=' my-2 min-h-[300px]'>
        {isEditting && (
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name='cover'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex justify-center items-center w-full h-[250px]  rounded-md relative '>
                        {isEditting && (
                          <CldUploadWidget
                            options={{
                              sources: ['local'],
                              multiple: false,
                              maxFiles: 1,
                              resourceType: 'image',
                              autoMinimize: false,
                              cropping: true,
                              croppingAspectRatio: 2,
                            }}
                            onSuccess={onSuccess}
                            onError={(error, options) => {
                              showToast(
                                'error',
                                <p>Oops something went wrong</p>
                              );
                            }}
                            uploadPreset='mymakaranta_preset'
                          >
                            {({ open }) => {
                              return (
                                <div
                                  onClick={() => {
                                    try {
                                      open();
                                    } catch (error) {
                                      console.log(error);

                                      showToast(
                                        'error',
                                        <p>Oops something went wrong</p>
                                      );
                                    }
                                  }}
                                  className='flex flex-col w-full justify-center items-center gap-2 cursor-pointer'
                                >
                                  <CloudUpload size={30} />
                                  <p> click to select file</p>
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
            {initialData.cover ? (
              <div className='flex justify-center  items-center w-full   rounded-md relative '>
                <Image
                  src={initialData?.cover?.url}
                  alt='images'
                  height={initialData?.cover.height}
                  width={initialData?.cover.width}
                />
              </div>
            ) : (
              <div className='flex flex-col justify-center  items-center w-full h-[300px]   rounded-md'>
                <ImageIcon size={50} className='text-gray-500' />
                <p className='text-sm text-gray-500'>No cover image</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageForm;
