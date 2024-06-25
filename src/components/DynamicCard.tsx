'use client';
import React, { useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CldUploadWidget } from 'next-cloudinary';
import { CloudUpload } from 'lucide-react';

import { Input, InputProps } from './ui/input';
import { Textarea } from '@/components/ui/textarea';
import DynamicInputWrapper from './DynamicInputWrapper';
import FileInput from './FileInput';
import MultiFileInput from './MultiFileInput';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

export type DynamicCardProps = InputProps & {
  title: string;
  selectOption?: any[];
  onSubmit?: (value: any) => void;
  onValueChange?: (value: any) => void;
  defaultValue?: any;
  inputType?:
    | 'text'
    | 'text-area'
    | 'image'
    | 'select'
    | 'add-lesson'
    | 'add-file'
    | 'switch'
    | 'video';
};

const DynamicCard = ({
  title,
  inputType,
  onSubmit,
  onValueChange,
  defaultValue,
  ...props
}: DynamicCardProps) => {
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState<string | boolean>();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState<any>(undefined);

  const currentItem = useMemo(() => {
    switch (inputType) {
      case 'text':
        return (
          <Input
            {...props}
            className={`${isEditting ? 'bg-[#fefefe]' : ''}`}
            disabled={!isEditting}
          />
        );

      case 'select':
        return (
          <Select
            disabled={!isEditting}
            onValueChange={onValueChange}
            defaultValue={defaultValue}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1'>Software Development</SelectItem>
              <SelectItem value='cst'>System architect and Design</SelectItem>
              <SelectItem value='mst'>AI and machine learning</SelectItem>
              <SelectItem value='pst'>UI/UX</SelectItem>
              <SelectItem value='akst'>Digital Marketing</SelectItem>
              <SelectItem value='hst'>Block chain Technology</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'add-lesson':
        return (
          <div className='flex justify-center items-center w-full min-h-[50px]  rounded-md relative '></div>
        );
      case 'switch':
        return (
          <div className='flex items-center space-x-2  w-full my-4 '>
            <Switch id='airplane-mode' disabled={!isEditting} />
            <Label htmlFor='airplane-mode'>Access mode</Label>
          </div>
        );
      case 'add-file':
        return (
          <div className='flex w-full min-h-[200px] rounded-md '>
            {isEditting && (
              <CldUploadWidget
                options={{
                  sources: ['local'],
                  multiple: true,
                  maxFiles: 5,
                  resourceType: 'file',
                }}
                onSuccess={(results, options) => {
                  console.log(results.info);
                  setFile(results.info);
                }}
                onError={(error, options) => {
                  console.log(error);
                }}
                uploadPreset='mymakaranta_preset'
              >
                {({ open }) => {
                  return (
                    <div
                      onClick={() => open()}
                      className='flex flex-col w-full justify-center items-center gap-2'
                    >
                      <CloudUpload size={30} />
                      <p>
                        Drag n drop a file here,
                        <br /> or click to select file
                      </p>
                    </div>
                  );
                }}
              </CldUploadWidget>
            )}

            {!isEditting && files?.length !== 0 && (
              <div className='flex flex-col w-full gap-2'>
                {files.map((file: any, index) => (
                  <div
                    className='flex w-full items-center justify-between gap-2 bg-white p-2 rounded-md'
                    key={index}
                  >
                    <div className='flex items-center w-[50px] h-[50px] relative border border-green-600 rounded-md overflow-hidden'>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt='images'
                        fill
                      />
                    </div>
                    <p className=' text-xs'>{file?.name}</p>
                    <Trash2 className=' text-gray-400' size={20} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className='flex justify-center items-center w-full h-[200px]  rounded-md relative '>
            {isEditting && (
              <CldUploadWidget
                options={{
                  sources: ['local'],
                  multiple: false,
                  maxFiles: 1,
                  resourceType: 'image',
                }}
                onSuccess={(results, options) => {
                  console.log(results.info);
                  setFile(results.info);
                }}
                onError={(error, options) => {
                  console.log(error);
                }}
                uploadPreset='mymakaranta_preset'
              >
                {({ open }) => {
                  return (
                    <div
                      onClick={() => open()}
                      className='flex flex-col w-full justify-center items-center gap-2'
                    >
                      <CloudUpload size={30} />
                      <p>
                        Drag n drop a file here,
                        <br /> or click to select file
                      </p>
                    </div>
                    // <div className='flex flex-col justify-center items-center gap-4 text-sm'>
                    //   <CloudUpload size={30} />
                    //   <Button variant='outline' onClick={() => open()}>
                    //     Upload Image
                    //   </Button>
                    // </div>
                  );
                }}
              </CldUploadWidget>
            )}
            {!isEditting && file && (
              <div className='w-full h-full relative'>
                <Image src={URL.createObjectURL(file)} alt='images' fill />
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className='flex justify-center items-center w-full h-[200px]  rounded-md relative '>
            <CldUploadWidget
              options={{
                // sources: ['local'],
                multiple: false,
                maxFiles: 1,
                resourceType: 'video',
              }}
              onSuccess={(results, options) => {
                console.log(results.info);
                setFile(results.info);
              }}
              onError={(error, options) => {
                console.log(error);
              }}
              uploadPreset='mymakaranta_preset'
            >
              {({ open }) => {
                return (
                  <div className='flex flex-col justify-center items-center gap-4 text-sm'>
                    <CloudUpload size={30} />
                    <Button variant='outline' onClick={() => open()}>
                      Upload Video
                    </Button>
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>
        );

      case 'text-area':
        return (
          <Textarea
            placeholder='Type your message here.'
            className={`h-20 ${isEditting ? 'bg-[#fefefe]' : ''}`}
            readOnly={!isEditting}
            disabled={!isEditting}
            onChange={(value) => {
              setValue(value.target.value);
            }}
          />
        );

      default:
        return (
          <Input
            className={`${isEditting ? 'bg-[#fefefe]' : ''}`}
            readOnly={!isEditting}
            disabled={!isEditting}
            onChange={(value) => {
              setValue(value.target.value);
            }}
          />
        );
    }
  }, [isEditting, inputType, props, files, file]);

  const submit = () => {
    if (onSubmit) {
      switch (inputType) {
        case 'text':
        case 'text-area':
          onSubmit(value);
          break;
        case 'add-file':
          onSubmit(files);
          break;
        case 'image':
          onSubmit(file);
          break;
        case 'video':
          onSubmit(file);
          break;
      }
    }
  };
  return (
    <DynamicInputWrapper
      type={inputType}
      title={title}
      toggle={() => {
        setIsEditting((value) => !value);
      }}
      submit={submit}
      isEditting={isEditting}
    >
      {currentItem}
    </DynamicInputWrapper>
  );
};

export default DynamicCard;
