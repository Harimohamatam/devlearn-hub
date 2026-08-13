import { Badge } from '../types';

export const BADGES_LIST: Badge[] = [
  {
    id: 'first-session',
    title: 'First Step',
    description: 'Log your first study session in DevLearn.',
    icon: 'Sparkles',
    unlocked: false
  },
  {
    id: 'polyglot',
    title: 'Polyglot Apprentice',
    description: 'Study at least 3 different programming languages.',
    icon: 'Languages',
    unlocked: false
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Complete 3 quizzes with a score of 80% or higher.',
    icon: 'Trophy',
    unlocked: false
  },
  {
    id: 'time-marathon',
    title: 'Study Marathon',
    description: 'Accumulate 1 total hour (3600 seconds) of active study time.',
    icon: 'Hourglass',
    unlocked: false
  },
  {
    id: 'streak-3',
    title: '3-Day Streak',
    description: 'Maintain an active study session for 3 consecutive days.',
    icon: 'Flame',
    unlocked: false
  },
  {
    id: 'systems-architect',
    title: 'Systems Explorer',
    description: 'Explore C++, Rust, or C language tutorials.',
    icon: 'Cpu',
    unlocked: false
  }
];
