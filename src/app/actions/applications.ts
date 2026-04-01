'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addApplication, replaceApplication, removeApplication } from '@/lib/store';
import type { Application, Stage } from '@/lib/types';

export type FormState = {
  errors?: Partial<Record<keyof Omit<Application, 'id'>, string>>;
};

const VALID_STAGES: Stage[] = [
  'Applied',
  'Phone Screen',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn',
];

function parseFormData(formData: FormData) {
  return {
    role: ((formData.get('role') as string) ?? '').trim(),
    company: ((formData.get('company') as string) ?? '').trim(),
    location: ((formData.get('location') as string) ?? '').trim(),
    jobUrl: ((formData.get('jobUrl') as string) ?? '').trim(),
    stage: formData.get('stage') as Stage,
    appliedOn: (formData.get('appliedOn') as string) ?? '',
    followUp: (formData.get('followUp') as string) ?? '',
    notes: ((formData.get('notes') as string) ?? '').trim(),
  };
}

function validate(data: ReturnType<typeof parseFormData>): FormState['errors'] | undefined {
  const err: NonNullable<FormState['errors']> = {};
  if (!data.role) err.role = 'Role is required.';
  if (!data.company) err.company = 'Company is required.';
  if (!data.appliedOn) err.appliedOn = 'Date applied is required.';
  if (!VALID_STAGES.includes(data.stage)) err.stage = 'Select a valid stage.';
  return Object.keys(err).length ? err : undefined;
}

export async function createApplicationAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = parseFormData(formData);
  const errors = validate(data);
  if (errors) return { errors };

  addApplication({ id: crypto.randomUUID(), ...data });
  revalidatePath('/applications');
  redirect('/applications');
}

export async function updateApplicationAction(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = parseFormData(formData);
  const errors = validate(data);
  if (errors) return { errors };

  replaceApplication({ id, ...data });
  revalidatePath('/applications');
  redirect('/applications');
}

export async function deleteApplicationAction(id: string): Promise<void> {
  removeApplication(id);
  revalidatePath('/applications');
}
