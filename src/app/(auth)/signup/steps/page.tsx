'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import { useStep } from '@/context/StepContextProvider';
import { cn } from '@/lib/utils';
import { FormSchema, FormSchemaType, defaultFormSchemaValue } from '@/types';
import { Form } from '../../../../components/ui/form';
import UserInformmation from '../../../../components/signup/UserInformmation';
import SetPassword from '../../../../components/signup/SetPassword';
import Navigation from '../../../../components/signup/Navigation';

const FormSection = () => {
  const { step } = useStep();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultFormSchemaValue,
  });

  return (
    <div className='flex w-full p-20 relative'>
      <div className='flex flex-col w-full'>
        <div className='w-[203px] h-[40px] relative'>
          <Image src={'/images/logo1.png'} alt='' fill />
        </div>
        <div className='flex flex-col gap-2 mt-10'>
          <h1 className=' text-xl font-semibold'>Welcome to MyMakaranta 👋</h1>
          <p className=' text-sm text-gray-500'>Lets Get you started!.</p>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <Form {...form}>
              <form>
                <div className={cn('hidden', { block: step === 1 })}>
                  <UserInformmation />
                </div>

                <div className={cn('hidden', { block: step === 2 })}>
                  <SetPassword
                    title='Set Password'
                    description='Set Password to new password and secure your account'
                  />
                </div>

                {/* <div className={cn("hidden", { block: step === 3 })}>
                  <AddOnsCard />
                 </div> */}

                {/* <div
              className={cn(
                "hidden",
                { block: step === 4 },
                { hidden: form.formState.isSubmitSuccessful }
              )}
            >
              <FinishingUpCard />
            </div> */}

                {/* <div
              className={cn("hidden", {
                block: form.formState.isSubmitSuccessful,
              })}
            >
              <ThankYouCard />
            </div> */}
              </form>
            </Form>
          </div>

          <div className='md:hidden' />
        </div>

        <Form {...form}>
          <Navigation />
        </Form>
      </div>
    </div>
  );
};

export default FormSection;
