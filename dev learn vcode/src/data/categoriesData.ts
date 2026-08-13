import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'web',
    name: 'Web Development',
    description: 'Frontend and backend languages powering modern web applications, browsers, and APIs.',
    iconName: 'Globe',
    color: 'emerald',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    badgeText: 'text-emerald-700 dark:text-emerald-300'
  },
  {
    id: 'backend',
    name: 'Backend & Cloud',
    description: 'Scalable server-side languages, cloud architecture, enterprise microservices, and web services.',
    iconName: 'Server',
    color: 'blue',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-700 dark:text-blue-300'
  },
  {
    id: 'systems',
    name: 'Systems & Low-Level',
    description: 'High-performance languages for OS kernels, game engines, embedded systems, and memory management.',
    iconName: 'Cpu',
    color: 'amber',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/40',
    badgeText: 'text-amber-700 dark:text-amber-300'
  },
  {
    id: 'data-ai',
    name: 'Data Science & AI',
    description: 'Languages for machine learning, statistical modeling, data visualization, and database querying.',
    iconName: 'Database',
    color: 'purple',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40',
    badgeText: 'text-purple-700 dark:text-purple-300'
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'Native and cross-platform languages powering iOS, Android, and cross-device mobile applications.',
    iconName: 'Smartphone',
    color: 'indigo',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-900/40',
    badgeText: 'text-indigo-700 dark:text-indigo-300'
  },
  {
    id: 'scripting',
    name: 'Functional & Scripting',
    description: 'Declarative functional paradigms, automation scripting, DevOps toolchains, and distributed systems.',
    iconName: 'Terminal',
    color: 'rose',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/40',
    badgeText: 'text-rose-700 dark:text-rose-300'
  }
];
