import { Section } from 'components';
import { portfolioData } from 'lib';
import React, { FC } from 'react';

export const ProjectsSection: FC = () => {
  const projects = portfolioData.projects;

  return (
    <Section className="mt-0 mb-10" title="Projects" description="Selected work and side projects.">
      <div className="mt-6 space-y-8">
        {projects.map((p, i) => (
          <div key={i} className="pl-4 border-l-2 border-gray-200 dark:border-cursor-border">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white-900">{p.title}</h3>
              {p.year && <span className="text-xs text-gray-500 dark:text-white-500">{p.year}</span>}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-white-700">{p.description}</p>
            <div className="flex flex-wrap mt-2 gap-1.5">
              {p.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 text-xs text-gray-700 bg-gray-100 rounded py-0.5 dark:bg-white-300/20 dark:text-white-700"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center mt-2 min-h-[44px] gap-3">
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  View →
                </a>
              )}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
