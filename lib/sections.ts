/** Section IDs for Explorer and Editor. Single source of truth for nav + content. */
export type SectionId = 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'certifications' | 'contact';

export const SECTION_IDS: SectionId[] = [
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'certifications',
  'contact',
];

export const SECTION_LABELS: Record<SectionId, string> = {
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  education: 'Education',
  certifications: 'Certifications',
  contact: 'Contact',
};
