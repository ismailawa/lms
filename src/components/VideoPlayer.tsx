'use client';
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useEffect, useState } from 'react';

type MyVideoPlayerProps = {
  id: string;
  src?: string;
  width?: number;
  height?: number;
};

const MyVideoPlayer = ({ id, src, width, height }: MyVideoPlayerProps) => {
  const [idV, setId] = useState<string>();
  const [srcv, setSrc] = useState<string>();

  useEffect(() => {
    setId(id);
    setSrc(src);
  }, [id, src]);

  return (
    <div className='relative w-full h-full '>
      <CldVideoPlayer
        width={1000}
        height={600}
        controls={true}
        src={id}
        onEnded={() => {}}
        colors={{
          base: '#05670d',
          text: '#ffffff',
          accent: '#00ff73',
        }}
      />
    </div>
  );
};

export default MyVideoPlayer;
