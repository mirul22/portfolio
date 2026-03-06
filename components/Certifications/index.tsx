import { Container, Section } from 'components';
import { useAnimation } from 'framer-motion';
import { portfolioData } from 'lib';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const Certifications: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { t } = useTranslation('common');
  const certifications = portfolioData.certifications;

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        transition: { delay: i * 0.1 },
      }));
    }
  }, [controls, inView]);

  return (
    <Section className="mt-0 mb-10" title={t('certifications.title')} description={t('certifications.description')}>
      <Container className="mt-6">
        <div className="grid gap-3 sm:grid-cols-2" ref={ref}>
          {certifications.map((item, i) => (
            <div
              key={i}
              className="px-4 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:border-cursor-border dark:bg-white-300/5 dark:text-white-700"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 dark:text-white-500">
                {item.issuer} · {item.date}
              </p>
              {item.credentialId && (
                <p className="mt-1 text-xs text-gray-500 opacity-70 dark:text-white-500">ID: {item.credentialId}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
