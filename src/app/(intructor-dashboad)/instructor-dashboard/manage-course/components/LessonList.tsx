'use client';
import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Grip, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type LessonListProps = {
  lessons: any[];
  onReOrder: (updateData: { id: number; position: number }[]) => void;
  onEdit: (id: number) => void;
};
const LessonList = ({ lessons, onReOrder, onEdit }: LessonListProps) => {
  const [items, setItems] = useState(lessons);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setItems(lessons);
  }, [lessons]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const xitems = Array.from(items);
    const [reorderItems] = xitems.splice(result.source.index, 1);
    xitems.splice(result.destination.index, 0, reorderItems);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updateLesson = xitems.slice(startIndex, endIndex + 1);
    setItems(xitems);
    const bulkUpdate = updateLesson.map((lesson) => ({
      id: lesson.id,
      position: xitems.findIndex((i) => i.id === lesson.id),
    }));
    onReOrder(bulkUpdate);
  };
  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lessons'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      'flex w-full items-center gap-x-2 bg-slate-200 border border-slate-200 rounded-md text-slate-700 mb-2 text-sm',
                      item.isPublished &&
                        ' bg-sky-100 border-sky-200 text-sky-700'
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        'px-2 py-2 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                        item.isPublished && ' border-r-sky-200 hover:bg-sky-200'
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className=' h-5 w-5' />
                    </div>
                    {item.title}
                    <div className=' ml-auto pr-2 flex items-center gap-x-2'>
                      {item.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          ' bg-slate-500',
                          item.isPublished && 'bg-sky-500'
                        )}
                      >
                        {item.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Pencil
                        onClick={() => {
                          onEdit(item.id);
                        }}
                        className=' h-4 w-4 cursor-pointer hover:opacity-75 transition'
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LessonList;
