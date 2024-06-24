import React from 'react';
import { Input, columns } from '@/components/ui/columns-assignment';
import { DataTable } from '@/components/ui/data-table';

async function getData(): Promise<Input[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52',
      date: "2024-06-15",
      completedAssignments: 2,
      totalAssignments: 2,
      name: 'Haafeez Ali',
    },
    {
      id: '728ed5f',
      date: "2024-07-15",
      completedAssignments: 1,
      totalAssignments: 2,
      name: 'John Doe',
    },
    {
      id: '728ed2f',
      date: "2023-06-15",
      completedAssignments: 2,
      totalAssignments: 3,
      name: 'Haafeez Ali',
    },
    // ...
  ];
}

export default async function   AssignmentTable() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10 bg-white'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
