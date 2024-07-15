'use client';

import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/dashboard/ProfileCard';
import Security from '@/components/dashboard/Security';
import Teams from '@/components/dashboard/Teams';
import Billing from '@/components/dashboard/Billing';
import { getUserProfile } from '@/server/actions/users';
import ProfileNav from '@/components/dashboard/ProfileNav';

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

  const renderSelectedPage: any = () => {
    switch (selectedPage) {
      case 'profile':
        return <ProfileCard profile={profile} />;
      case 'security':
        return <Security />;
      case 'teams':
        return <Teams />;
      case 'billing':
        return <Billing />;
      default:
        return <ProfileCard profile={profile} />;
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-lg text-gray-500 font-bold mb-2 md:mb-3'>
        Account Settings
      </h1>
      <div className='flex gap-3'>
        <ProfileNav setSelectedPage={setSelectedPage} />
        {renderSelectedPage()}
      </div>
    </div>
  );
};

export default Profile;
