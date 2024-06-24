'use client';
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { useEffect, useState } from 'react';

type MyVideoPlayerProps = {
  id: string;
  src: string;
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
        src='mymakaranta-video/xqutjr8s5muubzoidfwl'
        onEnded={() => {}}
        colors={{
          base: '#079207',
          text: '#000',
          accent: '#fff',
        }}
      />
    </div>
  );
};

export default MyVideoPlayer;
