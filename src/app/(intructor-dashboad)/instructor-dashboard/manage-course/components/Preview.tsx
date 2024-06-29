import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.bubble.css';

type PreviewProps = {
  value: string;
};
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const Preview = ({ value }: PreviewProps) => {
  return <QuillEditor value={value} theme='bubble' readOnly />;
};

export default Preview;
