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

type SidebarRouteProps = {
  routes: any;
};

const SidebarRoute = ({ routes }: SidebarRouteProps) => {
  const globalContext = useGlobalContext();

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
