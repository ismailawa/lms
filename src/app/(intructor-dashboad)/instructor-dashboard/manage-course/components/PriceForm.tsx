'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2Icon, PencilIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateCourse } from '@/server/actions/courses';
import { showToast } from '@/utils/showToast';
import { formatPrice } from '@/lib/format';

const formSchema = z.object({
  price: z.coerce.number(),
});

type PriceFormProps = {
  initialData: {
    price: any;
  };
  courseId: string;
};

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await updateCourse(courseId, values);
      if (result.success) {
        showToast('success', <p>{result.message}</p>);
        setIsEditting((v) => !v);
        form.reset();
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
        <h1 className=' text-sm'>Course price</h1>
        <Button
          variant={'ghost'}
          onClick={() => {
            setIsEditting((v) => !v);
          }}
        >
          {!isEditting ? (
            <>
              <PencilIcon size={15} className=' cursor-pointer mr-2' />
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
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='N 3,000.00'
                        type='number'
                        step={100}
                        className={`${isEditting ? 'bg-[#fefefe]' : ''}`}
                        disabled={!isEditting}
                        {...field}
                      />
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
            {formatPrice(initialData.price) || 'No price'}
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceForm;
