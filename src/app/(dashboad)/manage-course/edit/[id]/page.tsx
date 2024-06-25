import React, { useEffect, useState } from 'react';
import DynamicCard from '@/components/DynamicCard';
import { Button } from '@/components/ui/button';
import { Trash2, DollarSign, Paperclip } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getCourseAction } from '@/server/actions/courses';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import EditForm from '../../components/EditForm';

const Edit = async ({ params }: { params: any }) => {
  const data = await getCourseAction(params.id);

  return (
    <div className='flex flex-col gap-14 sm:max-w-5xl mx-auto w-full'>
      <h1 className=' text-2xl font-bold'>Course Creation</h1>
      <EditForm data={data} />
    </div>
  );
};

export default Edit;
