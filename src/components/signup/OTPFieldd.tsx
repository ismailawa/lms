import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const OTPFieldd = () => {
  return (
    <div className=' flex flex-col w-full mt-16 gap-10'>
      <div className='flex flex-col gap-1'>
        <h1 className=' text-2xl font-bold'>
          Enter verification code <br /> sent to your email
        </h1>
        <p className=' text-xs'>
          Enter the code we sent to “ismailaw2a.aliyu@gmail.com” to continue
        </p>
      </div>
      <div className=' flex flex-col gap-2'>
        <InputOTP
          maxLength={6}
          className='flex gap-2'
          onComplete={(value) => {
            console.log(value);
          }}
          onChange={() => {}}
          containerClassName='flex gap-3'
        >
          <InputOTPSlot index={0} />

          <InputOTPSlot index={1} />

          <InputOTPSlot index={2} />

          <InputOTPSlot index={3} />

          <InputOTPSlot index={4} />

          <InputOTPSlot index={5} />
        </InputOTP>
        <p className=' text-sm'>Having trouble? Resend OTP</p>
      </div>
    </div>
  );
};

export default OTPFieldd;
