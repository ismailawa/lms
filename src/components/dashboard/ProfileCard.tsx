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
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <ProfileHeader name={profile.name} avatar={profile.avatar} role={profile.role} location={profile.location} />
     <ProfileDetails
        firstName={profile.firstName}
        lastName={profile.lastName} 
        userName={profile.userName}
        email={profile.email}
        phone={profile.phone}
        bio={profile.bio}
        address={profile.address}
      /> 
    </div>
  );
};

export default ProfileCard;