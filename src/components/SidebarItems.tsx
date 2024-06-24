import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface SidebarItemsProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

const SidebarItems = ({
  icon: Icon,
  label,
  href,
  onClick,
}: SidebarItemsProps) => {
  const pathname = usePathname();
  const isActive =
    (pathname == '/' && href == '/') ||
    pathname == href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href!}
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 rounded-xl text-sm text-gray-600 font-medium px-2 transition-all duration-300  hover:text-green-300',
        isActive && 'text-green-500   hover:text-green-300 font-semibold'
      )}
    >
      <div className='flex items-center gap-x-2 py-2 relative'>
        <Icon size={20} className={cn('', isActive && 'text-green-500')} />
        {label}
      </div>
    </Link>
  );
};

export default SidebarItems;
