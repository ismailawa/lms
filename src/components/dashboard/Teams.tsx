import React from 'react';
import AddMember from './AddMember';
import { Separator } from '../ui/separator';

const Teams: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col  mx-auto bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl">
      <h1 className="text-lg font-bold mb-4 md:mb-6">Team Management</h1>
      <div className='p-4 bg-white rounded shadow-md'>
        <div className='flex flex-col w-full mb-3'>
          <h1 className='text-sm font-bold'>Teams</h1>
          <p className="text-xs">Overview of all members within your team</p>
        </div>
        <Separator />
        <AddMember/>
      </div>
    </div>
  );
};

export default Teams;
