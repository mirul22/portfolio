import { Container } from 'components';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

export const Footer: FC = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <p className="py-0 text-xs text-center text-gray-500 dark:text-white-500">
        <a
          href="https://github.com/LemonFace0309/personal-website-2.0"
          target="_blank"
          className="hover:opacity-80 transition-opacity"
          rel="noreferrer"
        >
          {t('footer')}
        </a>
      </p>
    </Container>
  );
};
