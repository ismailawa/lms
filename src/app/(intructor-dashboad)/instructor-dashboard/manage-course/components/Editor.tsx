import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({ value, onChange }: EditorProps) => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: ['black', 'green', 'gray', 'blue', 'yellow', 'pink'] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  return (
    <div className='bg-white overflow-hidden flex w-full'>
      <QuillEditor
        value={value}
        theme='snow'
        onChange={onChange}
        modules={quillModules}
        formats={quillFormats}
        className='flex flex-col w-[100%] h-[75%] mt-2 mb-3 bg-white'
      />
    </div>
  );
};

export default Editor;
