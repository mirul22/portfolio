import { Certifications, Contact, Education, Experience, Footer, Hero, ProjectsSection, Skills } from 'components';
import { useCursorLayout } from 'components/CursorLayout/context';
import type { SectionId } from 'lib/sections';
import React, { FC } from 'react';

const SECTION_COMPONENTS: Record<SectionId, FC> = {
  about: Hero,
  experience: Experience,
  projects: ProjectsSection,
  skills: Skills,
  education: Education,
  certifications: Certifications,
  contact: Contact,
};

export const EditorPanel: FC = () => {
  const { activeSection } = useCursorLayout();
  const Component = SECTION_COMPONENTS[activeSection];

  return (
    <main
      id="main-content"
      className="flex flex-col flex-1 min-w-0 overflow-auto bg-white cursor-layout__editor dark:bg-cursor-editor"
      tabIndex={-1}
    >
      <div className="flex items-center px-3 py-2 bg-white border-b border-gray-200 shrink-0 dark:border-cursor-border dark:bg-cursor-editor sm:px-4">
        <span className="font-mono text-xs text-gray-500 truncate dark:text-white-500">{activeSection}.tsx</span>
      </div>
      <div className="flex-1 px-4 py-5 overflow-auto sm:px-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <Component />
          <div className="pt-8 mt-12 border-t border-gray-200 dark:border-cursor-border">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
};
