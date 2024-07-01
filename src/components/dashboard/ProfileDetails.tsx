'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

interface ProfileDetailsProps {
  initialData: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    address: string;
    role: string;
    // externalLinks: {
    //   twitter: string;
    //   instagram: string;
    //   facebook: string;
    //   linkedin: string;
    //   github: string;
    // };
  };
  onUpdate: (key: string, value: string) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ initialData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(initialData);

  const handleChange = (key: string, value: string) => {
    setEditableData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Object.keys(editableData).forEach((key) => {
      onUpdate(key, editableData[key as keyof typeof editableData]);
    });
    setIsEditing(false);
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white border-2 border-gray-50 rounded-md p-6">
       <div className='flex justify-between'>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="mt-4">
            <Button className='mr-1' variant="ghost" onClick={() => setIsEditing(!isEditing)}>
              <PencilIcon size={15} className="mr-2" /> {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && <Button onClick={handleSave} className='mb-2' >Save</Button>}
          </div>
        </div> 
        <div className="space-y-2">
          {isEditing ? (
            <>
              <Input placeholder='First Name' value={editableData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
              <Input placeholder='Last Name' value={editableData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
              <Input placeholder='Email' value={editableData.email} onChange={(e) => handleChange('email', e.target.value)} />
              <Input placeholder='Phone' value={editableData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
              <Input placeholder='Bio' value={editableData.bio} onChange={(e) => handleChange('bio', e.target.value)} />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">First Name: {initialData.firstName}</p>
              <p className="text-sm text-gray-500">Last Name: {initialData.lastName}</p>
              <p className="text-sm text-gray-500">Email: {initialData.email}</p>
              <p className="text-sm text-gray-500">Phone: {initialData.phone}</p>
              <p className="text-sm text-gray-500">Bio: {initialData.bio}</p>
            </>
          )}
        </div>
      </div>
      <div className="bg-white border-2 border-gray-50 rounded-md p-6">
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="space-y-2">
          {isEditing ? (
            <>
              <Input placeholder='User Name' value={editableData.userName} onChange={(e) => handleChange('userName', e.target.value)} />
              <Input placeholder='Address' value={editableData.address} onChange={(e) => handleChange('address', e.target.value)} />
              <Input placeholder='Role' value={editableData.role} onChange={(e) => handleChange('role', e.target.value)} />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">User Name: {initialData.userName}</p>
              <p className="text-sm text-gray-500">Address: {initialData.address}</p>
              <p className="text-sm text-gray-500">Role: {initialData.role}</p>
            </>
          )}
        </div>
      </div>
      <div className="bg-white border-2 border-gray-50 rounded-md p-6">
        <h3 className="text-lg font-semibold mb-4">External Links</h3>
        <div className="space-y-2">
          {isEditing ? (
            <>
              {/* <Input value={editableData.externalLinks.twitter} onChange={(e) => handleChange('externalLinks.twitter', e.target.value)} />
              <Input value={editableData.externalLinks.instagram} onChange={(e) => handleChange('externalLinks.instagram', e.target.value)} />
              <Input value={editableData.externalLinks.facebook} onChange={(e) => handleChange('externalLinks.facebook', e.target.value)} />
              <Input value={editableData.externalLinks.linkedin} onChange={(e) => handleChange('externalLinks.linkedin', e.target.value)} />
              <Input value={editableData.externalLinks.github} onChange={(e) => handleChange('externalLinks.github', e.target.value)} /> */}
            </>
          ) : (
            <>
                                 {/* {initialData.externalLinks.twitter} */}
              <p className="text-sm text-gray-500">Twitter: </p>
              <p className="text-sm text-gray-500">Instagram: </p>
              <p className="text-sm text-gray-500">Facebook: </p>
              <p className="text-sm text-gray-500">LinkedIn: </p>
              <p className="text-sm text-gray-500">GitHub: </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
