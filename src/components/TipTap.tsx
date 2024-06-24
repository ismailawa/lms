import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TipTap = ({ description, onChange }: any) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description,
    editorProps: {
      attributes: {
        class:
          'rounded-md border w-full min-h-[150px] border-green-200 bg-gray-200',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
