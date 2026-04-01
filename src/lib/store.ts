/**
 * Milestone 2 — in-memory store using globalThis for dev-mode persistence.
 * Data resets on server restart and is NOT shared between serverless instances.
 * Milestone 3 replaces this module with Prisma + Postgres.
 */
import type { Application } from './types';

const seed: Application[] = [
  {
    id: '1',
    role: 'Frontend Engineer',
    company: 'Northbeam Labs',
    location: 'Remote',
    jobUrl: '',
    stage: 'Interview',
    appliedOn: '2026-03-22',
    followUp: '2026-04-03',
    notes: 'Spoke with recruiter. Strong interest in React + TypeScript.',
  },
  {
    id: '2',
    role: 'React Developer',
    company: 'Pocketbase',
    location: 'Remote',
    jobUrl: '',
    stage: 'Applied',
    appliedOn: '2026-03-27',
    followUp: '2026-04-04',
    notes: '',
  },
  {
    id: '3',
    role: 'Product Engineer',
    company: 'Aster Studio',
    location: 'New York, NY',
    jobUrl: '',
    stage: 'Offer',
    appliedOn: '2026-03-14',
    followUp: '2026-04-01',
    notes: 'Received offer. Comparing packages.',
  },
  {
    id: '4',
    role: 'Full Stack Engineer',
    company: 'Meadowlark',
    location: 'Austin, TX',
    jobUrl: '',
    stage: 'Phone Screen',
    appliedOn: '2026-03-30',
    followUp: '2026-04-07',
    notes: '',
  },
  {
    id: '5',
    role: 'UI Engineer',
    company: 'Harbor Health',
    location: 'Remote',
    jobUrl: '',
    stage: 'Rejected',
    appliedOn: '2026-03-10',
    followUp: '',
    notes: 'Position filled internally.',
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __jobTracker: { apps: Application[] } | undefined;
}

const store = globalThis.__jobTracker ?? { apps: [...seed] };
if (!globalThis.__jobTracker) globalThis.__jobTracker = store;

export function getApplications(): Application[] {
  return store.apps;
}

export function getApplication(id: string): Application | undefined {
  return store.apps.find((a) => a.id === id);
}

export function addApplication(app: Application): void {
  store.apps = [app, ...store.apps];
}

export function replaceApplication(updated: Application): void {
  store.apps = store.apps.map((a) => (a.id === updated.id ? updated : a));
}

export function removeApplication(id: string): void {
  store.apps = store.apps.filter((a) => a.id !== id);
}
