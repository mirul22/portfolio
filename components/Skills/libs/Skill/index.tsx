import { motion } from 'framer-motion';
import React, { cloneElement, FC } from 'react';

import { Props } from './props';

export const Skill: FC<Props> = ({ name, icon, href, controls, custom }: Props) => {
  return (
    <motion.a
      className="flex flex-col items-center justify-center py-3 text-center border border-gray-200 min-h-[88px] rounded-md bg-gray-50 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-cursor-border dark:bg-white-300/5 dark:hover:border-white-500/30 dark:hover:bg-white-300/10"
      target="_blank"
      href={href}
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      initial="initial"
      variants={{
        initial: { opacity: 0 },
      }}
      animate={controls}
      custom={custom}
    >
      {cloneElement(icon, { className: 'mx-auto h-8 w-8 shrink-0' })}
      <p className="max-w-full px-1 mt-2 text-xs font-medium text-gray-900 truncate dark:text-white-900">{name}</p>
    </motion.a>
  );
};
