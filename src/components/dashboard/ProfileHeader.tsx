import React from 'react';
import Image from 'next/image';

interface ProfileHeaderProps {
  name: string;
  avatar: string;
  role: string;
  location: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, avatar, role, location }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-4 space-y-4 md:space-y-0 border-2 border-gray-100 p-2">
      <Image src="/images/avatar.jpeg" alt={name} width={24} height={24} className="md:w-16 md:h-16 rounded-full" />
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm text-gray-900">{role}</p>
        <p className="text-sm text-gray-900">{location}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;