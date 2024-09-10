'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const PATHS = [
    {
      path: '/',
      name: 'Home',
      icon: <HomeIcon className="h-7 w-7" />,
    },
    {
      path: '/my-pokemon',
      name: 'My Pokemon',
      icon: <BookmarkIcon className="h-7 w-7" />,
    },
  ];

  if (PATHS.findIndex((p) => p.path === pathname) === -1) return null;

  return (
    <nav className="sticky w-full z-50 bottom-0 p-2 bg-light-footer dark:bg-dark-footer text-black dark:text-white border-t border-t-white rounded-tl-2xl rounded-tr-2xl">
      <ul className="flex flex-row justify-between items-center text-center">
        {PATHS.map((path) => (
          <li
            className={`w-[45%] ${pathname === path.path && 'text-yellow-300'}`}
            key={path.path}
          >
            <Link href={path.path} className="flex flex-col gap-1 items-center">
              {path.icon}
              {path.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
