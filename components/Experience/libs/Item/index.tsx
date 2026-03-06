import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { RiVirusFill } from 'react-icons/ri';

import { Props } from './props';

export const Item: FC<Props> = ({ title, place, date, last, first, controls, custom, cancelled, className }: Props) => {
  return (
    <motion.div
      className={clsx('relative flex items-center', !first && 'mt-8', className)}
      initial="initial"
      variants={{
        initial: {
          opacity: 0,
        },
      }}
      animate={controls}
      custom={custom}
    >
      {!last && <div className="absolute h-12 bg-gray-300 top-8 w-0.5 dark:bg-white-300" style={{ left: '0.2rem' }} />}
      <div className="w-2 h-2 bg-gray-500 rounded-full dark:bg-white-700" />
      <div className="ml-4 text-sm text-gray-600 md:ml-5 dark:text-white-700">
        <p className="font-medium text-gray-900 dark:text-white-900">{title}</p>
        <p className="text-gray-500 dark:text-white-500">{place}</p>
        <p className="text-xs text-gray-500 mt-0.5 dark:text-white-500">
          {date}
          {cancelled && <RiVirusFill className="ml-1" />}
        </p>
      </div>
    </motion.div>
  );
};
