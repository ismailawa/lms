'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PencilIcon } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  avatar: string;
  role: string;
  location: string;
  onUpdate: (key: string, value: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, avatar, role, location, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(name);
  const [editableRole, setEditableRole] = useState(role);
  const [editableLocation, setEditableLocation] = useState(location);

  const handleSave = () => {
    onUpdate('name', editableName);
    onUpdate('role', editableRole);
    onUpdate('location', editableLocation);
    setIsEditing(false);
  };

  return (
    <div className="flex md:flex-row items-center justify-between md:items-start space-x-0 md:space-x-4 space-y-4 md:space-y-0 border-2 border-gray-50 rounded-md p-2">
      <div className='flex'>
      <Image src="/images/avatar.jpeg" alt={name} width={64} height={64} className="md:w-16 md:h-16 rounded-full" />
      <div className="text-center md:text-left ">
        {isEditing ? (
          <>
            <Input placeholder='Name' value={editableName} onChange={(e) => setEditableName(e.target.value)} />
            <Input placeholder='Role' value={editableRole} onChange={(e) => setEditableRole(e.target.value)} />
            <Input placeholder='Location' value={editableLocation} onChange={(e) => setEditableLocation(e.target.value)} />
          </>
        ) : (
          <>
            <div>
              <h2 className="text-sm text-gray-900">Name: {name}</h2>
              <p className="text-sm text-gray-900">Role: {role}</p>
              <p className="text-sm text-gray-900">Location: {location}</p>
            </div> 
          </>
        )}
      </div>
      </div>
      <div className="mt-4 ">
            <Button className='mr-1' variant="ghost" onClick={() => setIsEditing(!isEditing)}>
              <PencilIcon size={15} className="mr-2" /> {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && <Button onClick={handleSave} className='mb-2' >Save</Button>}
      </div>
    </div>
  );
};

export default ProfileHeader;