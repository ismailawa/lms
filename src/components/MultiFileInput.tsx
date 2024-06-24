import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input, InputProps } from './ui/input';
import Image from 'next/image';
import { CloudUpload, Trash2 } from 'lucide-react';

export type FileInputProps = InputProps & {
  submitFile?: (value: any) => void;
  setFiles: (value: any) => void;
  files: any[];
};

const MultiFileInput = ({
  submitFile,
  setFiles,
  files,
  ...props
}: FileInputProps) => {
  const onDrop = useCallback(
    (dropFiles: any) => {
      setFiles((s: any) => [...s, ...dropFiles]);
    },
    [setFiles]
  );

  const handleDelete = (index: number) => {
    setFiles((s: any) => s.splice(index, 1));
    console.log('delete');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 5,
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
        className={`flex w-full h-full rounded-lg  border border-dashed border-green-400 p-2 ${
          isDragActive ? 'bg-[#fefefe]' : 'bg-[#fefefe]'
        }`}
      >
        {isDragActive ? (
          <p>Drap a file here...</p>
        ) : files?.length === 0 ? (
          <div className='flex flex-col w-full justify-center items-center gap-2'>
            <CloudUpload size={30} />
            <p>
              Drag n drop a file here,
              <br /> or click to select file
            </p>
          </div>
        ) : null}
        {files?.length !== 0 && (
          <div className='flex flex-col w-full gap-2'>
            {files.map((file, index) => (
              <div
                className='flex w-full items-center justify-between gap-2 bg-white p-2 rounded-md'
                key={index}
              >
                <div className='flex items-center w-[50px] h-[50px] relative border border-green-600 rounded-md overflow-hidden'>
                  <Image src={URL.createObjectURL(file)} alt='images' fill />
                </div>
                <p className=' text-xs'>{file.name}</p>
                <Trash2
                  className=' text-red-500 cursor-pointer'
                  size={20}
                  onClick={() => {
                    handleDelete(index);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiFileInput;
