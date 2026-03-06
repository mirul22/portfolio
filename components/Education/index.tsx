import { Container, Section } from 'components';
import { useAnimation } from 'framer-motion';
import { portfolioData } from 'lib';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const Education: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { t } = useTranslation('common');
  const education = portfolioData.education;

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        transition: { delay: (i + 2) * 0.15 },
      }));
    }
  }, [controls, inView]);

  return (
    <Section className="mt-0 mb-10" title={t('education.title')} description={t('education.description')}>
      <Container className="mt-6">
        <div className="space-y-6" ref={ref}>
          {education.map((item, i) => (
            <div key={i} className="relative flex items-start pl-5 border-l-2 border-gray-200 dark:border-white-300/50">
              <div
                className="absolute left-0 top-[0.4rem] h-2 w-2 -translate-x-1/2 shrink-0 rounded-full bg-gray-400 dark:bg-white-500"
                aria-hidden
              />
              <div className="min-w-0 flex-1 text-sm text-gray-600 dark:text-white-700">
                <p className="font-medium text-gray-900 break-words dark:text-white-900">{item.school}</p>
                {item.degree && <p className="break-words">{item.degree}</p>}
                <p className="mt-0.5 text-xs text-gray-500 dark:text-white-500">{item.date}</p>
                {item.grade && <p className="mt-1 text-xs text-gray-500 dark:text-white-500">Grade: {item.grade}</p>}
                {item.activities && (
                  <p className="mt-2 text-xs italic text-gray-500 dark:text-white-500">{item.activities}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
