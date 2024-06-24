import React from 'react';
import PlayListItem from '@/components/PlayListItem';

const VideoTab = () => {
  return (
    <div className='flex flex-col gap-1 h-[700px] overflow-y-scroll'>
      <PlayListItem isPlaying={true} isFree={true} />
      <PlayListItem isFree={true} />
      <PlayListItem isFree={true} />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
      <PlayListItem />
    </div>
  );
};

export default VideoTab;
