import { Container, Section } from 'components';
import { useAnimation } from 'framer-motion';
import { portfolioData } from 'lib';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo } from 'react';
import { FaReact } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

import {
  FigmaIcon,
  FirebaseIcon,
  GoIcon,
  LaravelIcon,
  MongoIcon,
  MySQLIcon,
  NextIcon,
  NodeIcon,
  PhpIcon,
  PostgresIcon,
  PostmanIcon,
  PrismaIcon,
  TailwindIcon,
  TsIcon,
  ViteIcon,
} from './libs/Icons';
import { Skill } from './libs/Skill';

const iconMap: Record<string, React.ReactElement> = {
  go: <GoIcon />,
  next: <NextIcon />,
  react: <FaReact color="#00D8FF" />,
  tailwind: <TailwindIcon />,
  ts: <TsIcon />,
  prisma: <PrismaIcon />,
  node: <NodeIcon />,
  mongo: <MongoIcon />,
  postgres: <PostgresIcon />,
  mysql: <MySQLIcon />,
  firebase: <FirebaseIcon />,
  vite: <ViteIcon />,
  laravel: <LaravelIcon />,
  figma: <FigmaIcon />,
  postman: <PostmanIcon />,
  php: <PhpIcon />,
};

export const Skills: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { t } = useTranslation('common');

  const skills = useMemo(
    () =>
      portfolioData.skills.map((s) => ({
        name: s.name,
        href: s.href,
        icon: iconMap[s.iconKey] ?? <TsIcon className="" />,
      })),
    []
  );

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        transition: { delay: (i + 2) * 0.2 },
      }));
    }
  }, [controls, inView]);

  return (
    <Section className="mt-0 mb-10" title={t('skills.title')} description={t('skills.description')}>
      <Container>
        <div className="max-w-lg mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" ref={ref}>
          {skills.map((skill, i) => (
            <Skill {...skill} key={i} custom={i} controls={controls} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
