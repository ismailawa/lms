import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';

interface ProfileProps {
  profile: {
    name: string;
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    bio: string;
    address: string;
  };
}

const ProfileCard: React.FC<ProfileProps> = ({ profile }) => {
  const handleUpdate = (key: string, value: string) => {
    // Update profile data
    console.log(`Update ${key} to ${value}`);
    //  update function
  };

  return (
    <div className=' flex flex-1 flex-col bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl'>
      <h1 className='text-lg font-bold mb-4 md:mb-6'>My Profile</h1>
      <ProfileHeader
        name={profile.name}
        avatar={profile.avatar}
        role={profile.role}
        location={profile.location}
        onUpdate={handleUpdate}
      />
      <ProfileDetails initialData={profile} onUpdate={handleUpdate} />
    </div>
  );
};

export default ProfileCard;
