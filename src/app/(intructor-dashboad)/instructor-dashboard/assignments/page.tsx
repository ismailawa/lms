import React from 'react'
import AssignmentTable from '@/components/dashboard/AssignmentTable'

const Assignment = () => {
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex flex-col w-full'>
        <AssignmentTable />
      </div>
    </div>
  )
}

export default Assignment