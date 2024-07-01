'use client';
import React from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

type CourseErollmentProps = {
  course: any;
  user: any;
};

const CourseEnrollment = ({ course, user }: CourseErollmentProps) => {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: `MEMA_${Date.now()}`,
    amount: course.price,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    meta: {
      courseId: course.id,
      userId: user?.id || 1,
    },
    customizations: {
      title: 'MYMakaranta',
      description: `Payment for ${course.title}`,
      logo: 'https://res.cloudinary.com/dsmzgdshz/image/upload/v1719743104/Ma_gzb91f.png',
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex w-full border-2 border-gray-300 justify-center items-center py-2 hover:text-white text-sm bg-[#f8f8f8] hover:bg-green-600 text-black rounded-lg cursor-pointer'>
          Enroll Now
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[1000px]'>
        <DialogHeader>
          {/* <DialogTitle>Course Enrollment</DialogTitle> */}
        </DialogHeader>
        <div className='flex w-full'>
          <Button
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {},
              });
            }}
          >
            Payment with React hooks
          </Button>
        </div>
        <DialogFooter>
          <div className='flex gap-2'>
            <Button
              className='w-fit bg-red-500 hover:bg-red-600 px-8 py-3'
              onClick={() => {}}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='w-fit bg-green-500 hover:bg-green-600 px-8 py-3'
              onClick={() => {}}
            >
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnrollment;
