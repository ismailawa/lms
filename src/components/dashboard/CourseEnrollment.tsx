'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { useFlutterwave } from 'flutterwave-react-v3';
import closePaymentModal from 'flutterwave-react-v3';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { DialogClose } from '@radix-ui/react-dialog';
import CourseSuccessful from './CourseSuccessful';

interface Course {
  id: number;
  title: string;
  price: number;
  sections: number;
  lessons: number;
  duration: string;
  discountedPrice: number;
  originalPrice: number;
  discount: number;
  subTotal: number;
  total: number;
}

interface User {
  id: number;
  email: string;
  phone?: string;
  name?: string;
}

interface CourseEnrollmentProps {
  course: any;
  user: any;
}

interface BillingDetails {
  country: string;
  zipCode: string;
  nameOnCard: string;
  cardNumber: string;
  accountName: string;
  accountNumber: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

const CourseEnrollment = ({ course, user }: CourseEnrollmentProps) => {
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    country: '',
    zipCode: '',
    nameOnCard: '',
    cardNumber: '',
    accountName: '',
    accountNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFlutterPayment = useFlutterwave({
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: `MEMA_${Date.now()}`,
    amount: course?.price || 0,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user?.email || '',
      phonenumber: user?.phone || '070********',
      name: user?.name || 'john doe',
    },
    meta: {
      courseId: course?.id || 0,
      userId: user?.id || 0,
    },
    customizations: {
      title: 'MYMakaranta',
      description: `Payment for ${course?.title || ''}`,
      logo: 'https://res.cloudinary.com/dsmzgdshz/image/upload/v1719743104/Ma_gzb91f.png',
    },
  });

  const handleSubmit = async () => {
    const payload = {
      course: course?.id,
      user: user?.id,
      billingDetails,
    };


    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Enrollment successful:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        //  closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
  };

  if (!course || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex w-full border-2 border-gray-300 justify-center items-center py-2 hover:text-white text-sm bg-green-500 hover:bg-green-600  rounded-lg cursor-pointer text-white'>
          Enroll Now
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:w-[1000px] w-[80%]  bg-[#f8f8f8] border-4 border-solid border-white'>
        <div className='flex w-full justify-between items-center border border-[#CAE1C2] p-2 rounded-md '>
          <DialogTitle className='text-sm ml-3'>Check Out</DialogTitle>
          <DialogClose asChild>
            <Button variant={'ghost'}>X Cancel</Button>
          </DialogClose>
        </div>
        <div className='w-full'>
          <div className='flex lg:flex-row flex-col gap-2'>
            <div className='lg:w-[60%] w-full flex-col'>
              <div className='flex flex-col '>
                <div className='flex justify-between'>
                  <h1 className='text-sm font-bold mb-1'>Payment</h1>
                  <h1 className='text-sm font-bold mb-1'>Secured Connection</h1>
                </div>
                <div className='border border-[#CAE1C2] rounded-md'>
                  <div className='w-full flex justify-between bg-[#CAE1C2] p-2'>
                    <div className='w-full flex gap-2'>
                      <Image
                          src='/images/card.png'
                          alt=''
                          width={20}
                          height={20}
                        />
                        <h1 className='text-xs font-bold'>Pay with Card</h1>
                      </div>
                      <Image
                        src='/images/card-type.png'
                        alt=''
                        width={50}
                        height={20}
                      />
                  </div>
                  <div className='flex flex-col w-full p-2 gap-3'>
                    <div className='flex flex-col w-full'>
                      <h1 className='text-xs font-bold mb-1'>Name on card</h1>
                      <div className="relative">
                      <img
                        src="/images/user.png" 
                        alt="User Icon"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Input
                        type='text'
                        name='nameOnCard'
                        value={billingDetails.nameOnCard}
                        onChange={handleInputChange}
                        className='w-full outline-none pl-10 border border-[#CAE1C2]'
                        placeholder='John Doe'
                      />
                      </div>
                    </div>
                    <div className='flex flex-col w-full'>
                      <h1 className='text-xs font-bold mb-1'>Card Number</h1>
                      <div className="relative">
                      <img
                        src="/images/card.png" 
                        alt="card Icon"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Input
                        type='number'
                        name='cardNumber'
                        value={billingDetails.cardNumber}
                        onChange={handleInputChange}
                        className='w-full outline-none border border-[#CAE1C2] pl-10'
                        placeholder='0000-0000-0000-0000'
                      />
                      </div>
                    </div>
                    <div className='flex w-full gap-3'>
                      <div className='flex flex-col w-full'>
                        <h1 className='text-xs font-bold mb-1'>Expiry Date</h1>
                        <div className="relative">
                        <img
                          src="/images/calender.png" 
                          alt="calender Icon"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                        <Input
                          type='text'
                          name='expiryDate'
                          value={billingDetails.expiryDate}
                          onChange={handleInputChange}
                          className='w-full outline-none border border-[#CAE1C2] pl-10'
                          placeholder='MM/YY'
                        />
                        </div>
                      </div>
                      <div className='flex flex-col w-full'>
                        <h1 className='text-xs font-bold mb-1'>CVV</h1>
                        <div className="relative">
                        <img
                          src="/images/lock.png" 
                          alt="lock Icon"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                        <Input
                          type='number'
                          name='cvv'
                          value={billingDetails.cvv}
                          onChange={handleInputChange}
                          className='w-full outline-none border border-[#CAE1C2] pl-10'
                          placeholder='***'
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Accordion type="single" collapsible className=' mt-3'>
                <AccordionItem value="item-1" className='border border-[#CAE1C2] rounded-md'>
                  <AccordionTrigger className='bg-[#CAE1C2] p-2'>
                    <div className='w-full flex gap-2 '>
                     <Image
                        src='/images/bank.png'
                        alt=''
                        width={20}
                        height={20}
                      />
                      <h1 className='text-xs font-bold'>Pay with Bank</h1>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                  <div className='flex flex-col w-full p-2 gap-3'>
                    <div className='flex flex-col w-full'>
                      <h1 className='text-xs font-bold mb-1'>Account Name</h1>
                      <div className="relative">
                      <img
                        src="/images/user.png" 
                        alt="User Icon"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Input
                        type='text'
                        name='nameOnCard'
                        value={billingDetails.accountName}
                        onChange={handleInputChange}
                        className='w-full outline-none border border-[#CAE1C2] pl-10'
                        placeholder='John Doe'
                      />
                      </div>
                    </div>
                    <div className='flex flex-col w-full'>
                      <h1 className='text-xs font-bold mb-1'>Account Number</h1>
                      <div className="relative">
                      <img
                        src="/images/card.png" 
                        alt="card Icon"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Input
                        type='number'
                        name='cardNumber'
                        value={billingDetails.accountNumber}
                        onChange={handleInputChange}
                        className='w-full outline-none border border-[#CAE1C2] pl-10'
                        placeholder='0000-0000-0000-0000'
                      />
                      </div>
                    </div>
                    <div className='flex w-full gap-3'>
                      <div className='flex flex-col w-full'>
                        <h1 className='text-xs font-bold mb-1'>Expiry Date</h1>
                        <div className="relative">
                        <img
                          src="/images/calender.png" 
                          alt="calender Icon"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                        <Input
                          type='text'
                          name='expiryDate'
                          value={billingDetails.expiryDate}
                          onChange={handleInputChange}
                          className='w-full outline-none border border-[#CAE1C2] pl-10'
                          placeholder='MM/YY'
                        />
                        </div>
                      </div>
                      <div className='flex flex-col w-full'>
                        <h1 className='text-xs font-bold mb-1'>CVV</h1>
                        <div className="relative">
                        <img
                          src="/images/lock.png" 
                          alt="lock Icon"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                        />
                        <Input
                          type='number'
                          name='cvv'
                          value={billingDetails.cvv}
                          onChange={handleInputChange}
                          className='w-full outline-none border border-[#CAE1C2] pl-10'
                          placeholder='***'
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className='flex justify-between mt-2'>
                <h1 className='text-xs font-bold'>
                  Securely save this card for my later purchase
                </h1>
                <Checkbox
                name='saveCard'
                checked={billingDetails.saveCard}
                // onChange={handleInputChange}
                />
              </div>
              
            </div>
            <div className='lg:w-[40%] w-full flex flex-col gap-3 lg:mt-6'>
              <div className='flex flex-col gap-3 border border-[#CAE1C2] rounded-md'>
                <Image src='/images/card.png' alt='' width={10} height={10} />
                <div className='p-2 bg-[#CAE1C2]'>
                  <h1 className='text-sm mb-1 font-bold '>
                  The Complete UI/UX Design Course for beginners
                    {course.title}
                  </h1>
                  <div className='flex justify-start gap-2 mb-1'>
                    <h1 className='text-xs'>{course.sections} sections</h1>
                    <h1 className='text-xs'>{course.lessons} lessons</h1>
                    <h1 className='text-xs'>{course.duration} duration</h1>
                  </div>
                  <div className='flex gap-4'>
                    <p className='text-xs font-bold text-green-600'>
                      ${course.discountedPrice}100
                    </p>
                    <del className='text-xs'>${course.originalPrice}150</del>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 bg-[#CAE1C2] rounded-md p-2'>
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-1'>Original price</h1>
                  <p className='text-xs font-bold'>${course.originalPrice}</p>
                </div>
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-1'>Discount</h1>
                  <p className='text-xs font-bold'>${course.discount}</p>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-1'>Sub-total</h1>
                  <p className='text-xs font-bold'>${course.subTotal}</p>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-1'>Total</h1>
                  <p className='text-xs font-bold'>${course.total}</p>
                </div>
              </div>
              <div className='mt-2'>
                <p className='text-xs'>
                  By completing this purchase you agree to our terms and
                  conditions
                </p>
              </div>
              <Button onClick={handleSubmit}>
                <CourseSuccessful/>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnrollment;
