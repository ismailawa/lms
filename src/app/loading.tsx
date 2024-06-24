'use client';

import { Vortex } from 'react-loader-spinner';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // return <LoadingSkeleton />
  return (
    <div className='flex flex-col gap-4 justify-center items-center w-full min-h-screen'>
      <Vortex
        visible={true}
        height='100'
        width='100'
        ariaLabel='vortex-loading'
        wrapperStyle={{}}
        wrapperClass='vortex-wrapper'
        colors={['red', 'green', 'blue', 'green', 'orange', 'green']}
      />
      <h1>Please wait...</h1>
    </div>
  );
}
