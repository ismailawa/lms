import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { PlusIcon } from 'lucide-react';

interface Member {
  email: string;
  status: 'active' | 'pending';
}

const AddMember: React.FC = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [newMembers, setNewMembers] = useState([{ email: '' }]);

  const handleAddMember = () => {
    setShowInputs(true);
  };

  const handleAddAnother = () => {
    setNewMembers([...newMembers, { email: '' }]);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newMembersCopy = [...newMembers];
    newMembersCopy[index][name as keyof { email: string }] = value;
    setNewMembers(newMembersCopy);
  };

  const handleSendInvite = () => {
    const membersWithStatus = newMembers.map(member => ({ ...member, status: 'pending' as 'active' | 'pending' }));
    setMembers([...members, ...membersWithStatus]);
    setNewMembers([{ email: '' }]);
    setShowInputs(false);
  };

  const handleDeleteMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleDeleteInvite = (index: number) => {
    const updatedNewMembers = newMembers.filter((_, i) => i !== index);
    setNewMembers(updatedNewMembers);
  };

  return (
    <div className="mt-4">
      <div className='flex justify-between mb-4'>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold">Team leader</h1>
          <p className='text-xs'>You can manage your team members, ensuring clear direction and effective leadership within your team.</p>
        </div>
        <button 
          onClick={handleAddMember}
          className="px-3 py-2 bg-[#0D9422] text-white text-xs font-bold rounded hover:bg-green-600 flex"
        >
            <PlusIcon className="w-4 h-4" />
          Add member
        </button>
      </div>
      {showInputs && (
        <div className="mt-4">
          <Separator />
          {newMembers.map((member, index) => (
            <div key={index} className="flex flex-col mt-4">
              <input
                type="email"
                name="email"
                value={member.email}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="email"
                className=" px-4 py-2 border rounded text-sm w-[80%]"
              />
            </div>
          ))}
          <div className='flex justify-between mt-4'>
            <button 
              onClick={handleAddAnother}
              className="mr-2 text-black text-xs justify-center font-bold rounded flex"
            >
                <PlusIcon className="w-4 h-4" />
              Add another
            </button>
            <button 
              onClick={handleSendInvite}
              className="px-3 py-2 bg-[#B40000] text-xs font-bold text-white rounded hover:bg-red-600"
            >
              Send invite
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Separator />
        <h2 className="text-sm font-bold mt-2">Team Members</h2>
        {members.length === 0 && <p className="text-xs">No members added yet.</p>}
        {members.length !== 0 && <p className='text-xs'>Manage your team seamlessly in this section. Add or remove team member. </p>}
        {members.map((member, index) => (
          <div key={index} className="flex justify-between items-center mt-2 p-2">
            <p className="text-xs font-bold">{member.email}</p>
            <div className="flex gap-3">
                <div className={`text-xs text-white px-3 py-2 rounded ${member.status === 'active' ? 'bg-green-500' : 'bg-[#DA6A03]'}`}>
                {member.status === 'active' ? 'Active' : 'Pending'}
                </div>
                <button 
                onClick={() => handleDeleteMember(index)}
                className={`px-3 py-2 text-xs font-bold rounded bg-[#B40000] hover:bg-red-600 text-white`}
                >
                {member.status === 'pending' ? 'Delete Invite' : 'Delete'}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMember;

