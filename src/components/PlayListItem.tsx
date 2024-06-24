import React from 'react';
import {
  Book,
  Heart,
  LockIcon,
  LockOpenIcon,
  PlayCircle,
  Plus,
} from 'lucide-react';

type PlayListItemProps = {
  isPlaying?: boolean;
  isFree?: boolean;
};

const PlayListItem = ({
  isPlaying = false,
  isFree = false,
}: PlayListItemProps) => {
  return (
    <div className='flex w-full items-center justify-between py-3 border-b-2 cursor-pointer'>
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg ${
          isPlaying ? 'bg-green-500' : ''
        }`}
      >
        {isPlaying ? (
          <PlayCircle color='white' />
        ) : (
          <PlayCircle color='black' />
        )}
      </div>
      <div className='flex flex-col'>
        <p className='text-sm text-gray-500'>
          Introduction to Usability Testing
        </p>
        <p className=' text-xs'>0:34</p>
      </div>
      <div>
        {isFree ? (
          <h1 className=' text-xs text-gray-400'>Free</h1>
        ) : (
          <LockIcon size={15} />
        )}
      </div>
    </div>
  );
};

export default PlayListItem;
