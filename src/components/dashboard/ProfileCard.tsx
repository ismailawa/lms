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
    externalLinks: {
      twitter: string;
      instagram: string;
      facebook: string;
      linkedin: string;
      github: string;
    };
  };
}

const ProfileCard: React.FC<ProfileProps> = ({ profile }) => {
  const handleUpdate = (key: string, value: string) => {
    // Update profile data 
    console.log(`Update ${key} to ${value}`);
    //  update function
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
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
