'use client';

import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/dashboard/ProfileCard';
import { getUserProfile } from '@/server/actions/users';

const Profile = () => {
  const [profile, setProfile] = useState(null);

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
    return <div className="p-4 md:p-8 lg:p-12">Error fetching profile data</div>;
  }

  return (
    <div className="bg-white min-h-screen p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 md:mb-6">My Profile</h1>
      <ProfileCard profile={profile} />
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
