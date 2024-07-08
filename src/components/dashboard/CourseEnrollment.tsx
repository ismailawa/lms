'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useFlutterwave } from 'flutterwave-react-v3';
import closePaymentModal from 'flutterwave-react-v3';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import SelectCountry from './SelectCountry';
import { DialogClose } from '@radix-ui/react-dialog';

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
      <DialogContent className='lg:w-[1000px] w-[100%]'>
        <div className='flex w-full justify-between items-center border border-[#CAE1C2] p-2 rounded-md'>
          <DialogTitle className='text-sm ml-3'>Check Out</DialogTitle>
          <DialogClose asChild>
            <Button variant={'ghost'}>X</Button>
          </DialogClose>
        </div>
        <div className='w-full'>
          <div className='flex lg:flex-row flex-col gap-3'>
            <div className='lg:w-[60%] w-full flex-col'>
              <div className='flex flex-col'>
                <h1 className='text-sm font-bold mb-2'>Billing address</h1>
                <div className='flex border border-[#CAE1C2] p-4 gap-5 rounded-md'>
                  <div className='flex flex-col w-full'>
                    <h1 className='text-xs font-bold mb-1'>Country</h1>
                    <SelectCountry
                      onChange={(country: string) =>
                        setBillingDetails((prevDetails) => ({
                          ...prevDetails,
                          country,
                        }))
                      }
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <h1 className='text-xs font-bold mb-1'>Zip Code</h1>
                    <Input
                      type='text'
                      name='zipCode'
                      value={billingDetails.zipCode}
                      onChange={handleInputChange}
                      placeholder='000-0000'
                      className='w-full outline-none border border-[#CAE1C2]'
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col mt-5'>
                <div className='flex justify-between'>
                  <h1 className='text-sm font-bold mb-2'>Payment</h1>
                  <h1 className='text-sm font-bold mb-2'>Secured Connection</h1>
                </div>
                <div className='border border-[#CAE1C2] rounded-md'>
                  <div className='w-full flex justify-between bg-[#CAE1C2] p-4'>
                    <h1 className='text-xs font-bold'>Credit/Debit card</h1>
                    <Image
                      src='/images/card.png'
                      alt=''
                      width={50}
                      height={20}
                    />
                  </div>
                  <div className='flex flex-col w-full p-4 gap-5'>
                    <div className='flex flex-col w-full'>
                      <h1 className='text-xs font-bold mb-1'>Name on card</h1>
                      <Input
                        type='text'
                        name='nameOnCard'
                        value={billingDetails.nameOnCard}
                        onChange={handleInputChange}
                        className='w-full outline-none border border-[#CAE1C2]'
                        placeholder='John Doe'
                      />
                    </div>
                    <div className='flex flex-col w-full'>
                      <h1 className='text-xs font-bold mb-1'>Card Number</h1>
                      <Input
                        type='number'
                        name='cardNumber'
                        value={billingDetails.cardNumber}
                        onChange={handleInputChange}
                        className='w-full outline-none border border-[#CAE1C2]'
                        placeholder='0000-0000-0000-0000'
                      />
                    </div>
                    <div className='flex w-full gap-3'>
                      <div className='flex flex-col w-full'>
                        <h1 className='text-xs font-bold mb-1'>Expiry Date</h1>
                        <Input
                          type='text'
                          name='expiryDate'
                          value={billingDetails.expiryDate}
                          onChange={handleInputChange}
                          className='w-full outline-none border border-[#CAE1C2]'
                          placeholder='MM/YY'
                        />
                      </div>
                      <div className='flex flex-col w-full'>
                        <h1 className='text-xs font-bold mb-1'>CVV</h1>
                        <Input
                          type='number'
                          name='cvv'
                          value={billingDetails.cvv}
                          onChange={handleInputChange}
                          className='w-full outline-none border border-[#CAE1C2]'
                          placeholder='***'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between mt-2'>
                <h1 className='text-xs font-bold'>
                  Securely save this card for my later purchase
                </h1>
                <Checkbox
                // name='saveCard'
                // checked={billingDetails.saveCard}
                // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='lg:w-[40%] w-full flex flex-col gap-3 lg:mt-6'>
              <div className='flex flex-col gap-3 border border-[#CAE1C2] rounded-md'>
                <Image src='/images/card.png' alt='' width={50} height={150} />
                <div className='p-2 bg-[#CAE1C2]'>
                  <h1 className='text-sm mb-2 font-bold text-center'>
                    {course.title}
                  </h1>
                  <div className='flex justify-around mb-2'>
                    <h1 className='text-xs'>{course.sections} sections</h1>
                    <h1 className='text-xs'>{course.lessons} lessons</h1>
                    <h1 className='text-xs'>{course.duration}</h1>
                  </div>
                  <div className='flex p-2 gap-2'>
                    <p className='text-xs font-bold text-green-600'>
                      ${course.discountedPrice}
                    </p>
                    <del className='text-xs'>${course.originalPrice}</del>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3 bg-[#CAE1C2] rounded-md p-3'>
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-2'>Original price</h1>
                  <p className='text-xs font-bold'>${course.originalPrice}</p>
                </div>
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-2'>Discount</h1>
                  <p className='text-xs font-bold'>${course.discount}</p>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-2'>Sub-total</h1>
                  <p className='text-xs font-bold'>${course.subTotal}</p>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <h1 className='text-xs font-bold mt-2'>Total</h1>
                  <p className='text-xs font-bold'>${course.total}</p>
                </div>
              </div>
              <div className='mt-2'>
                <p className='text-xs'>
                  By completing this purchase you agree to our terms and
                  conditions
                </p>
              </div>
              <Button onClick={handleSubmit}>Completed Checkout</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnrollment;
