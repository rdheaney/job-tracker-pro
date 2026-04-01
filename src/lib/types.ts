export type Stage =
  | 'Applied'
  | 'Phone Screen'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Withdrawn';

export interface Application {
  id: string;
  role: string;
  company: string;
  location: string;
  jobUrl: string;
  stage: Stage;
  appliedOn: string;
  followUp: string;
  notes: string;
}
