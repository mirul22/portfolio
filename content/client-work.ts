/**
 * Projects Amirul shipped for clients as a software engineer before Vorto, from his project history
 * document. Only facts from that document. The employer for each project is not recorded, so never name one.
 */

export interface ClientProject {
  name: string;
  scope: string;
  stack: string[];
  duration?: string;
}

export interface Client {
  id: string;
  name: string;
  /** Short English description of the client, if the name alone is not clear. */
  description?: string;
  projects: ClientProject[];
}

export const clientWork: Client[] = [
  {
    id: 'skmm',
    name: 'SKMM',
    description: 'Malaysian Communications and Multimedia Commission',
    projects: [
      {
        name: 'Online Radio Amateur Exam (ORAE)',
        scope: 'Computerised radio amateur exam system, integrated with the SKMM Exam Management System (SEMS).',
        stack: ['Java'],
      },
      { name: 'ORAE Morse Code Exam', scope: 'Morse code exam module for ORAE.', stack: ['Java'] },
      { name: 'Exam Centers module', scope: 'Built and deployed to 12 exam sites.', stack: ['Java'] },
      { name: 'SEMS enhancements', scope: 'Support for multiple exam centers and new exam types.', stack: ['Java'] },
      {
        name: 'ORAE enhancements',
        scope: 'Support for multiple exam centers and new exam types, plus new deployments to 6 exam centers.',
        stack: ['Java'],
      },
    ],
  },
  {
    id: 'myanmar',
    name: 'Republic of the Union of Myanmar',
    projects: [
      {
        name: 'Passport and Visa Issuance System (VIS and PIS)',
        scope:
          'Deployment and ongoing operations support at 7 Myanmar embassies: Kuala Lumpur, Singapore, Kunming, Paris, Tokyo, Manila and Jakarta.',
        stack: ['PHP', 'C#'],
      },
    ],
  },
  {
    id: 'jhev',
    name: 'Jabatan Hal Ehwal Veteran ATM (JHEV)',
    description: 'Malaysian Armed Forces Veterans Affairs',
    projects: [
      {
        name: 'VIBES 2.0',
        scope: 'Full rebuild of VIBES 1.0 as a web portal and mobile app.',
        stack: ['C#', 'ASP.NET'],
        duration: '3 years',
      },
      { name: 'VIBES 1.0', scope: 'Maintenance support.', stack: ['ASP.NET MVC', 'SQL Server 2008'] },
      {
        name: 'VETIS 2.0',
        scope: 'Portal with user management and role-based access.',
        stack: ['C#', 'ASP.NET'],
        duration: '2 years',
      },
      {
        name: 'Veteran information update portal',
        scope: 'Portal with user and role-scoped access management.',
        stack: ['ASP.NET', 'C#'],
        duration: '2 years',
      },
      {
        name: 'Usahawan JHEV',
        scope: 'E-marketplace portal plus Android and iOS apps.',
        stack: ['PHP Laravel', 'Java', 'Swift'],
        duration: '2 years',
      },
      {
        name: 'Portal Kempen Tabung Pahlawan 2019',
        scope: 'Campaign portal with online payment through MPAY and a CMS.',
        stack: ['ASP.NET', 'C#'],
      },
    ],
  },
  {
    id: 'kraftangan',
    name: 'Perbadanan Kemajuan Kraftangan Malaysia',
    projects: [
      {
        name: 'MyCraftShoppe',
        scope: 'E-marketplace portal and mobile app.',
        stack: ['PHP Laravel', 'React Native'],
      },
    ],
  },
  {
    id: 'mara',
    name: 'Majlis Amanah Rakyat (MARA)',
    projects: [
      {
        name: 'Total Campus Management Solution (TCMS)',
        scope: 'System portal and mobile app.',
        stack: ['C#', 'PHP Moodle'],
      },
    ],
  },
  {
    id: 'corporate-travel',
    name: 'Corporate travel',
    projects: [
      {
        name: 'BCD Refresh and Plover',
        scope: 'Central business travel system for end-to-end booking.',
        stack: ['C#', 'ASP.NET'],
      },
    ],
  },
];

export function clientStack(client: Client): string[] {
  return [...new Set(client.projects.flatMap((p) => p.stack))];
}

/** Facts from the project history that are safe to quote as highlights. */
export const clientHighlights = [
  'Passport and visa system deployed to 7 Myanmar embassies across Asia and Europe',
  'SKMM exam centers module deployed to 12 exam sites',
];
