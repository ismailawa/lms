'use client';
import { useStep } from '../../context/StepContextProvider';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { FormSchemaType } from '../../types';
import { useFinalValue } from '../../context/FinalValueContextProvider';
import { signUpAction } from '@/server/actions/authentication';
import { useState, useTransition } from 'react';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { RotatingLines } from 'react-loader-spinner';
import { showToast } from '@/utils/showToast';
import { setAuthCookie } from '@/lib/cookies';

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { step, setStep } = useStep();
  const { values, setValues } = useFinalValue();
  const form = useFormContext<FormSchemaType>();
  const globalContext = useGlobalContext();

  async function onSubmit(payload: FormSchemaType) {
    setIsLoading(true);
    const result = await signUpAction({ ...values, ...payload });
    if (result.success) {
      globalContext.setCongratulation(true);
      setValues({
        email: '',
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        otp: '',
      });
      form.reset();
    } else {
      showToast('error', <p>{result.message}</p>);
    }

    setIsLoading(false);
  }

  async function handleNextStep() {
    if (step === 1) {
      const result = await form.trigger(['firstName', 'lastName', 'username'], {
        shouldFocus: true,
      });
      result && setStep(2);
    }
  }

  function handleBackStep() {
    if (step <= 1 || step >= 3) {
      return;
    }
    const currentStep = step;
    setStep(currentStep - 1);
  }

  return (
    <div className='flex items-center justify-between bg-white py-5'>
      {/* the following div tag is used for proper 'justify-between' effect on mobile version */}
      <div className={cn('hidden', { block: step === 1 })} />

      <Button
        type='button'
        className={cn('block', { hidden: step === 1 })}
        onClick={handleBackStep}
        variant='outline'
      >
        Go Back
      </Button>

      <Button
        type='button'
        className={cn('block', { hidden: step === 2 })}
        onClick={handleNextStep}
      >
        Next Step
      </Button>

      <Button
        type='button'
        className={cn('hidden min-w-28 ', {
          ' flex justify-center items-center': step === 2,
        })}
        onClick={form.handleSubmit(onSubmit)}
      >
        {isLoading ? (
          <RotatingLines
            visible={isLoading}
            height='30'
            width='30'
            color='white'
            strokeWidth='5'
            animationDuration='0.75'
            ariaLabel='rotating-lines-loading'
          />
        ) : (
          'Confirm'
        )}
      </Button>
    </div>
  );
};

export default Navigation;
