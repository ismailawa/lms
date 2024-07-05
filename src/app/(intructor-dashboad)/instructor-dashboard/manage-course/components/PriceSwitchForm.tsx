'use client';
import React, { useEffect, useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { updateLessonAction } from '@/server/actions/lessons';
import { showToast } from '@/utils/showToast';

const formSchema = z.object({
  isFree: z.boolean(),
});

type PriceSWitchFormProps = {
  initialData: {
    isFree: boolean;
  };
  lessonId: string;
};

const PriceSWitchForm = ({ initialData, lessonId }: PriceSWitchFormProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialData.isFree || false,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await updateLessonAction(lessonId, values);
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
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className='flex flex-col w-full gap-2 bg-[#f8f8f8] border-4 border-solid border-white p-4 rounded-xl'>
      <div className='flex justify-between w-full items-center'>
        <h1 className=' text-sm'>Enable price</h1>
        <Button
          variant={'ghost'}
          onClick={() => {
            setIsEditting((v) => !v);
          }}
        >
          {!isEditting ? (
            <>
              <PencilIcon size={15} className='cursor-pointer mr-2' />
              Edit price
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div className='my-1'>
        <Separator />
      </div>
      <div className=' my-2'>
        {isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='isFree'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex items-center space-x-2  w-full my-4 '>
                        <Switch
                          id='airplane-mode'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor='airplane-mode'>Access mode</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between w-full text-sm mt-5'>
                <Button
                  type='submit'
                  disabled={!isValid || isSubmitting}
                  className='flex justify-center items-center bg-green-500 px-2 py-1 text-white  min-w-[80px] rounded-sm cursor-pointer'
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
        {!isEditting && (
          <p className='p-2 text-sm font-semibold'>
            {initialData.isFree ? 'Payment' : 'Free'}
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceSWitchForm;
