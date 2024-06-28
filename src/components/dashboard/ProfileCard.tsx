import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';

interface ProfileCardProps {
  profile: {
    name: string;
    firstName: string;
    lastName: string; 
    role: string;
    location: string;
    email: string;
    phone: string;
    bio: string;
    address: {
      country: string;
      city: string;
      postalCode: string;
      taxId: string;
    };
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <ProfileHeader name={profile.name} role={profile.role} location={profile.location} />
      <ProfileDetails
        firstName={profile.firstName}
        lastName={profile.lastName} 
        email={profile.email}
        phone={profile.phone}
        bio={profile.bio}
        address={profile.address}
      />
    </div>
  );
};

export default ProfileCard;