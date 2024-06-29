import React from 'react';

interface ProfileDetailsProps {
  userName: string;
  firstName: string;
  lastName: string;  
  email: string;
  phone: string;
  bio: string;
  address: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ firstName, lastName, userName, email, phone, bio, address }) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white border-2 border-gray-100  rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-2">
          <p className='text-sm text-gray-500'>First Name: {firstName}</p>  
          <p className='text-sm text-gray-500'>Last Name: {lastName}</p>
          <p className='text-sm text-gray-500'>Email: {email}</p>
          <p className='text-sm text-gray-500'>Phone: {phone}</p>
          <p className='text-sm text-gray-500'>Bio: {bio}</p>
        </div>
      </div>
      <div className="bg-white border-2 border-gray-100 rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="space-y-2">
          <p className='text-sm text-gray-500'>User Name: {userName}</p>
          <p className='text-sm text-gray-500'>Address: {address}</p>  
          {/* we need to add more information from the backend */}
          <p className='text-sm text-gray-500'>Role:</p>
          <p className='text-sm text-gray-500'></p>
          
        </div>
      </div>
      <div className="bg-white border-2 border-gray-100 rounded p-6">
        <h3 className="text-lg font-semibold mb-4">External links</h3>
        <div className="space-y-2">
          <p className='text-sm text-gray-500'>Twitter:</p>
          <p className='text-sm text-gray-500'>Instagram:</p>  
          <p className='text-sm text-gray-500'>Facebook:</p>
          <p className='text-sm text-gray-500'>Linkedin:</p>
          <p className='text-sm text-gray-500'>Github:</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;