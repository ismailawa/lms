import React from 'react';

interface ProfileHeaderProps {
  name: string;
  role: string;
  location: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, role, location }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-4 space-y-4 md:space-y-0">
      <img src="/profile-pic-placeholder.jpg" alt={name} className="w-24 h-24 md:w-16 md:h-16 rounded-full" />
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;