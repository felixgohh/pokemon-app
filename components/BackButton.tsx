'use client';

import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname !== '/' && pathname !== '/my-pokemon') {
    return (
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-6 left-4 flex flex-row items-center "
      >
        <ChevronLeftIcon className="w-7 h-7" />
        Back
      </button>
    );
  }

  return null;
}
