import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import Image from 'next/image'
  

const CourseSuccessful = () => {
  return (
    <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent >
            <AlertDialogHeader>
                <Image src='/images/card.png' alt="success" width={100} height={100} />
            <AlertDialogTitle>Congratulations! Your Course Purchase Was Successful!</AlertDialogTitle>
            <AlertDialogDescription>
            Congratulations on your successful course purchase! Access your course content now and start your journey.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <div className='flex flex-col justify-center gap-2'>
               <AlertDialogAction className='text-xs text-white bg-green-600'>Access course now</AlertDialogAction>
               <AlertDialogAction className='text-xs text-black hover:bg-green-600 bg-white'>Discover another course</AlertDialogAction>
            </div>
        </AlertDialogContent>
    </AlertDialog>

  )
}

export default CourseSuccessful