import { Container, Section } from 'components';
import { portfolioData } from 'lib';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

export const Contact: FC = () => {
  const { t } = useTranslation('common');
  const { email, resumeHref, calendlyHref } = portfolioData.about;

  return (
    <Section className="mt-0 mb-10" title={t('contact.title')} description={t('contact.description')}>
      <Container>
        <div className="flex flex-col mt-6 gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 min-h-[44px] hover:underline dark:text-blue-400 md:text-base"
          >
            {email}
          </a>
          {resumeHref && (
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded min-h-[44px] min-w-[44px] w-fit gap-2 bg-gray-50 hover:bg-gray-100 dark:border-cursor-border dark:bg-white-300/10 dark:text-white-700 dark:hover:bg-white-300/20 touch-manipulation"
            >
              Download CV / Resume
            </a>
          )}
          {calendlyHref && (
            <a
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded min-h-[44px] min-w-[44px] w-fit gap-2 bg-gray-50 hover:bg-gray-100 dark:border-cursor-border dark:bg-white-300/10 dark:text-white-700 dark:hover:bg-white-300/20 touch-manipulation"
            >
              Book a call
            </a>
          )}
        </div>
      </Container>
    </Section>
  );
};
