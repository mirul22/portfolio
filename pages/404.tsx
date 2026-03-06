import Link from 'next/link';
import React, { FC } from 'react';

const Custom404: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center min-h-[60vh]">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white-900 md:text-3xl">Page not found</h1>
      <p className="mt-2 text-gray-600 dark:text-white-700">Nothing here.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center mt-6 min-h-[44px] px-4 py-3 text-sm font-medium text-blue-600 rounded hover:underline dark:text-blue-400 touch-manipulation"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Custom404;
