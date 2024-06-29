import { getUserProfile } from '@/server/actions/users';
import React from 'react';

const Profile = async () => {
  const userProfile = await getUserProfile();
  console.log(userProfile);

  return <div>profile</div>;
};

export default Profile;
