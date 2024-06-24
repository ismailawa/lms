import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input, InputProps } from './ui/input';
import Image from 'next/image';
import { CloudUpload } from 'lucide-react';

export type FileInputProps = InputProps & {
  file: any;
  setFile: (value: any) => void;
};

const FileInput = ({ setFile, file, ...props }: FileInputProps) => {
  const onDrop = useCallback(
    (dropFiles: any) => {
      setFile(dropFiles[0]);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
  });
  return (
    <div {...getRootProps()} className='w-full h-full'>
      <Input
        {...getInputProps()}
        {...props}
        className=' w-full h-full appearance-none rounded border px-3 py-2 shadow focus:outline-none '
      />
      <div
        className={`flex w-full h-full rounded-lg justify-center items-center border border-dashed border-green-400 p-2 ${
          isDragActive ? 'bg-gray-300' : 'bg-gray-200'
        }`}
      >
        {isDragActive ? (
          <p>Drap a file here...</p>
        ) : file === undefined ? (
          <div className='flex flex-col justify-center items-center gap-2 text-sm'>
            <CloudUpload size={30} />
            <p className=' text-center'>{`Drag 'n' drop a file here, or click to select file`}</p>
          </div>
        ) : null}
        {file && (
          <div className='w-full h-full relative'>
            <Image src={URL.createObjectURL(file)} alt='images' fill />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInput;
