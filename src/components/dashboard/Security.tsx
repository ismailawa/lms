import React, { useState } from 'react';
import { PencilIcon } from 'lucide-react';
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from '../ui/separator';


const Security: React.FC = () => {
  const initialData = { email: '', sms: '' }; // Define initialData
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingSms, setIsEditingSms] = useState(false);
  const [editableData, setEditableData] = useState(initialData);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleChange = (key: string, value: string) => {
    setEditableData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Object.keys(editableData).forEach((key) => {
      onUpdate(key, editableData[key as keyof typeof editableData]);
    });
    setIsEditingEmail(false);
    setIsEditingSms(false);
  };

  const onUpdate = (key: string, value: string) => {
    // API call 
    console.log(`Updated ${key} with value ${value}`);
  };


  const validatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return false;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return false;
    }
    return true;
  };

  const handlePasswordSave = () => {
    if (validatePassword()) {
      // API call
      console.log('Password updated successfully.');
      setPasswordSuccess('Password updated successfully.');
      setPasswordError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="flex flex-1 flex-col mx-auto bg-[#f8f8f8] border-4 border-solid border-white p-5 rounded-2xl">
      <h1 className="text-lg font-bold mb-4 md:mb-6">Security Settings</h1>
      <div className='flex lg:flex-row flex-col gap-2'>
        <Card className="lg:w-[50%] w-[100%] mt-2">
          <CardHeader>
            <CardTitle className='text-green-500 text-sm font-bold'>Additional security for authentication</CardTitle>
            <CardDescription className='text-xs font-medium'>
              Add additional security to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col gap-2">
            <div className="space-y-1">
              <div className='flex justify-between'>
                <div className="flex flex-col">
                  <Label htmlFor="code" className='text-sm mb-1'>Additional Email</Label>
                  <p className="text-xs text-gray-500">Recovery email address</p>
                </div>
                <div className="mt-2">
                  <Button className='mr-1 border border-gray-200' variant="ghost" onClick={() => setIsEditingEmail(!isEditingEmail)}>
                     {isEditingEmail ? 'Cancel' : 'Setup'}
                  </Button>
                  {isEditingEmail && <Button onClick={handleSave} className='text-xs'>Save</Button>}
                </div>
              </div>
              <div className="space-y-2">
                {isEditingEmail ? (
                  <Input placeholder='Email' value={editableData.email} onChange={(e) => handleChange('email', e.target.value)} />
                ) : (
                  <p className="text-sm font-bold text-gray-700">{editableData.email}</p>
                )}
              </div>
            </div>
            <Separator/>
            <div className='space-y-1'>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <Label htmlFor="code" className='text-sm mb-1'>SMS Recovery</Label>
                  <p className="text-xs text-gray-500">Recovery mobile number</p>
                </div>
                <div className="mt-2">
                  <Button className='mr-1 border border-gray-200' variant="ghost" onClick={() => setIsEditingSms(!isEditingSms)}>
                     {isEditingSms ? 'Cancel' : 'Setup'}
                  </Button>
                  {isEditingSms && <Button onClick={handleSave} className=' text-xs'>Save</Button>}
                </div>
              </div>
              <div className="space-y-2">
                {isEditingSms ? (
                  <Input placeholder='Phone Number' value={editableData.sms} onChange={(e) => handleChange('sms', e.target.value)} />
                ) : (
                  <p className="text-sm font-bold text-gray-700">{editableData.sms}</p>
                )}
              </div>
            </div>
            <Separator/>
          </CardContent>
        </Card>
        <Tabs defaultValue="password" className="lg:w-[50%] w-[100%]">
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className='text-green-500 text-sm font-bold'>Password</CardTitle>
                <CardDescription className='text-xs font-medium'>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                {passwordSuccess && <p className="text-green-500 text-sm">{passwordSuccess}</p>}
              </CardContent>
              <CardFooter>
                <Button onClick={handlePasswordSave}>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;
