'use client';

import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/dashboard/ProfileCard';
import Security from '@/components/dashboard/Security';
import Teams from '@/components/dashboard/Teams';
import Billing from '@/components/dashboard/Billing';
import Notifications from '@/components/dashboard/Notifications';
import { getUserProfile } from '@/server/actions/users';
import ProfileNav from '@/components/dashboard/ProfileNav';
import Delete from '@/components/dashboard/Delete';

interface UserProfile {
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
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className='p-4 md:p-8 lg:p-12'>Error fetching profile data</div>
    );
  }

  const renderSelectedPage = () => {
    switch (selectedPage) {
      case 'profile':
        return <ProfileCard profile={profile} />;
      case 'security':
        return <Security />;
      case 'teams':
        return <Teams />;
      case 'billing':
        return <Billing />;
      case 'notifications':
        return <Notifications />;
      case 'delete':
        return <Delete />;
      default:
        return <ProfileCard profile={profile} />;
    }
  };

  return (
    <div className='min-h-screen'>
      <h1 className='text-lg text-gray-500 font-bold mb-2 md:mb-3'>
        Account Settings
      </h1>
      <div className='flex gap-3 w-full'>
        <ProfileNav setSelectedPage={setSelectedPage} />
        {renderSelectedPage()}
      </div>
    </div>
  );
};

export default Profile;

// const Profile = async () => {
//   const userProfile = await getUserProfile();
//   console.log(userProfile);

//   return <div>profile</div>;
// };

// export default Profile;
