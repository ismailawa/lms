import React from 'react';

interface ProfileDetailsProps {
  firstName: string;
  lastName: string;  
  email: string;
  phone: string;
  bio: string;
  address: {
    country: string;
    city: string;
    postalCode: string;
    taxId: string;
  };
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ firstName, lastName, email, phone, bio, address }) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white shadow-md rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-2">
          <p className='text-sm text-gray-500'>First Name {firstName}</p>  
          <p className='text-sm text-gray-500'>Last Name {lastName}</p>
          <p className='text-sm text-gray-500'>Email {email}</p>
          <p className='text-sm text-gray-500'>Phone {phone}</p>
          <p className='text-sm text-gray-500'>Bio {bio}</p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Address</h3>
        <div className="space-y-2">
          <p className='text-sm text-gray-500'>Country: {address.country}</p>
          <p className='text-sm text-gray-500'>City/State: {address.city}</p>
          <p className='text-sm text-gray-500'>Postal Code: {address.postalCode}</p>
          <p className='text-sm text-gray-500'>Tax ID: {address.taxId}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;