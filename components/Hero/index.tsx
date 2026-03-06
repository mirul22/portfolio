import { Container, MediaIcon } from 'components';
import { motion } from 'framer-motion';
import { portfolioData } from 'lib';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { HandWave } from './libs/HandWave';
import { HeroLink } from './libs/HeroLink';

export const Hero: FC = () => {
  const { t } = useTranslation('common');
  const about = portfolioData.about;

  return (
    <Container className="pt-0">
      <motion.img
        src="/images/me.jpg"
        alt="Amirul Ikmal"
        className="w-20 h-20 overflow-hidden rounded-full md:h-24 md:w-24"
        variants={{
          hidden: {
            scale: 0,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
          },
        }}
        transition={{
          damping: 5,
          mass: 1,
          delay: 6,
        }}
        initial="hidden"
        animate="visible"
      />
      <div className="flex items-center gap-2">
        <h1 className="mt-4 mb-2 text-2xl font-bold text-gray-900 dark:text-white-900 md:mt-6 md:mb-3 md:text-3xl">
          {about.title}
        </h1>
        <HandWave className="text-2xl md:text-3xl" />
      </div>
      <p className="text-base font-medium leading-snug text-gray-700 break-words md:text-lg dark:text-white-700">
        {about.headline}
        <br />
        <span className="block mt-1">
          {t('hero.p2')} <HeroLink title="Soskod Solution" href={about.soskodHref} />
        </span>
        {about.availability && (
          <span className="block mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">{about.availability}</span>
        )}
      </p>
      {about.customServices && about.customServices.items.length > 0 && (
        <div className="p-4 mt-5 border-2 border-blue-200 rounded-lg bg-blue-50/80 dark:border-blue-800 dark:bg-blue-950/30">
          <p className="mb-3 text-sm font-semibold tracking-wide text-blue-700 uppercase dark:text-blue-300">
            {about.customServices.title}
          </p>
          <ul className="text-sm text-gray-700 space-y-2 dark:text-white-700">
            {about.customServices.items.map((s, i) => (
              <li key={i} className="flex flex-col gap-0.5">
                <span className="font-medium text-gray-900 dark:text-white-900">{s.label}</span>
                <span className="text-gray-600 dark:text-white-600">{s.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex mt-5 gap-4">
        {about.socials.map((s) => (
          <MediaIcon
            key={s.icon}
            icon={
              s.icon === 'github' ? (
                <FaGithub className="w-6 h-6 md:w-7 md:h-7" />
              ) : (
                <FaLinkedin className="w-6 h-6 md:w-7 md:h-7" />
              )
            }
            href={s.href}
          />
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {about.descriptions.map((des, i) => (
          <p key={i} className="text-sm leading-relaxed text-gray-600 md:text-base dark:text-white-700">
            {des}
          </p>
        ))}
        {about.currentlyExploring && (
          <p className="text-sm italic text-gray-500 dark:text-white-500">{about.currentlyExploring}</p>
        )}
        {about.testimonial && (
          <blockquote className="pt-2 pl-4 text-sm text-gray-600 border-l-2 border-blue-500 dark:border-blue-400 dark:text-white-700 md:text-base">
            <p className="italic break-words">&ldquo;{about.testimonial.quote}&rdquo;</p>
            <footer className="mt-1 not-italic text-gray-500 dark:text-white-500">
              {about.testimonial.author}
              {about.testimonial.roleOrContext && <span className="ml-1">({about.testimonial.roleOrContext})</span>}
            </footer>
          </blockquote>
        )}
      </div>
    </Container>
  );
};
