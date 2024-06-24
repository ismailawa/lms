'use client';
import React, { useEffect, useState } from 'react';
import {
  Home,
  BookOpen,
  User,
  BookImage,
  CircleUser,
  LogOut,
  VideoIcon,
  CommandIcon,
  CalendarCheck,
  GroupIcon,
  Accessibility,
  GitCommitVerticalIcon,
} from 'lucide-react';
import SidebarItems from './SidebarItems';
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { Separator } from '@radix-ui/react-dropdown-menu';

const routesInstructor = [
  {
    type: 'item',
    icon: Home,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    type: 'item',
    icon: BookOpen,
    label: 'Mtg Courses',
    href: '/manage-course',
  },
  {
    type: 'item',
    icon: User,
    label: 'Students',
    href: '/students',
  },
  {
    type: 'item',
    icon: BookImage,
    label: 'Assignments',
    href: '/assignments',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    icon: VideoIcon,
    label: 'Live Class',
    href: '/live-class',
  },
  {
    type: 'item',
    icon: CommandIcon,
    label: 'Social Connection',
    href: '/live-class',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    icon: BookImage,
    label: 'Get Started',
    href: '/get-started',
  },
];

const routesStudent = [
  {
    type: 'item',
    icon: Home,
    label: 'Dashboard',
    href: '/student-dashboard',
  },
  {
    type: 'item',
    icon: BookOpen,
    label: 'My Courses',
    href: '/courses',
  },
  {
    type: 'item',
    icon: GitCommitVerticalIcon,
    label: 'Certifications',
    href: '/certifications',
  },
  {
    type: 'item',
    icon: CalendarCheck,
    label: 'Events',
    href: '/events',
  },
  {
    type: 'item',
    icon: Accessibility,
    label: 'Community',
    href: '/community',
  },
];

const SidebarRoute = () => {
  const globalContext = useGlobalContext();

  const [routes, setRoutes] = useState<any>([]);

  useEffect(() => {
    console.log(globalContext.userType);

    if (globalContext.userType === 'instructor') {
      setRoutes(routesInstructor);
    }
    if (globalContext.userType === 'student') {
      setRoutes(routesStudent);
    }
  }, [globalContext.userType]);

  return (
    <div className='flex flex-col w-full gap-1 flex-1'>
      {routes &&
        routes.map((route: any, index: any) => {
          if (route.type === 'separator')
            return (
              <div className=' w-full h-[0.5px] bg-slate-500' key={index} />
            );
          return (
            <SidebarItems
              icon={route.icon}
              label={route.label}
              href={route.href}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default SidebarRoute;
