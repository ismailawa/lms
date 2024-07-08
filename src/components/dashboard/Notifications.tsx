import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bell } from 'lucide-react';
import { Separator } from '../ui/separator';

interface Notification {
  id: number;
  message: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notifications'); // Adjust the endpoint as needed
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data: Notification[] = await response.json();
      setNotifications(data);
      setError('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='border-none'
        >
          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-[#f8f8f8] border-4 border-solid border-white p-5'>
        <SheetHeader className='mb-6'>
          <SheetTitle className='text-sm font-bold'>
            View all notifications
          </SheetTitle>
        </SheetHeader>
        <div>
          {loading ? (
            <p>Loading notifications...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : notifications.length === 0 ? (
            <p>No notifications found.</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className='mb-2'>
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;

// fetch endpoint to get the notifications

// app.get('/api/notifications', (req, res) => {
//   const notifications = [
//     { id: 1, message: 'Your password was changed successfully.' },
//     { id: 2, message: 'You have a new login from an unknown device.' },
//     { id: 3, message: 'Your profile was updated.' },
//   ];
//   res.status(200).json(notifications);
// });
