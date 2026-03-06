import { Container } from 'components';
import React, { FC } from 'react';

import { Props } from './props';

export const SectionHeader: FC<Props> = ({ title, description, className }: Props) => {
  return (
    <Container className={className}>
      <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl dark:text-white-900">{title}</h2>
      <p className="mb-6 text-sm text-gray-600 md:text-base dark:text-white-700">{description}</p>
    </Container>
  );
};
