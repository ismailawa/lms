import { getUserProfile } from '@/server/actions/users';
import React from 'react';
import { GetServerSideProps } from 'next';
import ProfileCard from '@/components/dashboard/ProfileCard';


interface ProfileProps {
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



const Profile: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 md:mb-6">My Profile</h1>
      <ProfileCard profile={profile} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const profile = await getUserProfile();
    return {
      props: {
        profile
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        profile: null
      }
    };
  }
};

export default Profile;

// const Profile = async () => {
//   const userProfile = await getUserProfile();
//   console.log(userProfile);

//   return <div>profile</div>;
// };

// export default Profile;
