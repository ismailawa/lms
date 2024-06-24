import React from 'react';
import { Payment, columns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52',
      price: 1000,
      status: 'Drafted',
      title: 'Introduction to programming',
    },
    {
      id: '728ed5f',
      price: 13000,
      status: 'Published',
      title: 'Introduction to Blender',
    },
    {
      id: '728ed2f',
      price: 3000,
      status: 'Drafted',
      title: 'Basic programming',
    },
    // ...
  ];
}

export default async function CourseTable() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10 bg-white'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
