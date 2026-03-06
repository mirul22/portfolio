import clsx from 'clsx';
import React, { FC } from 'react';

import { Props } from './props';

export const Container: FC<Props> = ({ className, children }: Props) => {
  return <div className={clsx('mx-auto max-w-screen-md px-0', className)}>{children}</div>;
};
