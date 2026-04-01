'use client';

import { useActionState } from 'react';
import type { FormState } from '@/app/actions/applications';
import type { Application, Stage } from '@/lib/types';

const STAGES: Stage[] = [
  'Applied',
  'Phone Screen',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn',
];

interface Props {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: Partial<Application>;
}

export function ApplicationForm({ action, defaultValues = {} }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      <Field
        label="Role"
        name="role"
        required
        defaultValue={defaultValues.role}
        error={state.errors?.role}
      />
      <Field
        label="Company"
        name="company"
        required
        defaultValue={defaultValues.company}
        error={state.errors?.company}
      />
      <Field
        label="Location"
        name="location"
        defaultValue={defaultValues.location}
      />
      <Field
        label="Job URL"
        name="jobUrl"
        type="url"
        defaultValue={defaultValues.jobUrl}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="stage" className="text-sm font-medium text-[var(--ink)]">
          Stage
        </label>
        <select
          id="stage"
          name="stage"
          defaultValue={defaultValues.stage ?? 'Applied'}
          className="rounded-xl border border-[#e6dfcf] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
        >
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {state.errors?.stage && (
          <p className="text-xs text-[var(--rose)]">{state.errors.stage}</p>
        )}
      </div>

      <Field
        label="Date Applied"
        name="appliedOn"
        type="date"
        required
        defaultValue={defaultValues.appliedOn}
        error={state.errors?.appliedOn}
      />
      <Field
        label="Follow-Up Date"
        name="followUp"
        type="date"
        defaultValue={defaultValues.followUp}
      />

      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="notes" className="text-sm font-medium text-[var(--ink)]">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues.notes}
          className="resize-none rounded-xl border border-[#e6dfcf] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
          placeholder="Recruiter name, links, impressions…"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[var(--ink)] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Saving…' : 'Save Application'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-[var(--ink)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--rose)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="rounded-xl border border-[#e6dfcf] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
      />
      {error && <p className="text-xs text-[var(--rose)]">{error}</p>}
    </div>
  );
}
