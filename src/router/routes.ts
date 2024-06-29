import {
  Home,
  BookOpen,
  User,
  BookImage,
  VideoIcon,
  CommandIcon,
  CalendarCheck,
  GroupIcon,
  Accessibility,
  GitCommitVerticalIcon,
  LucideView,
} from 'lucide-react';

export const publicRoutes = ['/home'];
export const authRoutes = ['/login', '/signup'];
export const protectedRoutes = [
  '/instructor-dashboard/manage-course',
  '/instructor-dashboard',
  '/student-dashboard',
  '/students',
  '/assignments',
];

export const routesInstructor = [
  {
    type: 'item',
    icon: Home,
    label: 'Dashboard',
    href: '/instructor-dashboard',
  },
  {
    type: 'item',
    icon: BookOpen,
    label: 'Courses',
    href: '/instructor-dashboard/manage-course',
  },
  {
    type: 'item',
    icon: User,
    label: 'Students',
    href: '/instructor-dashboard/students',
  },
  {
    type: 'item',
    icon: BookImage,
    label: 'Assignments',
    href: '/instructor-dashboard/assignments',
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

export const routesStudent = [
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
    href: '/student-dashboard/my-courses',
  },
  {
    type: 'item',
    icon: LucideView,
    label: 'Browse Courses',
    href: '/student-dashboard/courses',
  },
  {
    type: 'item',
    icon: GitCommitVerticalIcon,
    label: 'Certifications',
    href: '/student-dashboard/certifications',
  },
  {
    type: 'item',
    icon: CalendarCheck,
    label: 'Events',
    href: '/student-dashboard/events',
  },
  {
    type: 'item',
    icon: Accessibility,
    label: 'Community',
    href: '/student-dashboard/community',
  },
];
