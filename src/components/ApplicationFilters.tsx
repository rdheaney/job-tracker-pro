'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { Stage } from '@/lib/types';

const STAGES: Stage[] = [
  'Applied',
  'Phone Screen',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn',
];

export function ApplicationFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeStage = searchParams?.get('stage') ?? '';
  const search = searchParams?.get('q') ?? '';

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      <input
        type="search"
        placeholder="Search role or company…"
        value={search}
        onChange={(e) => update('q', e.target.value)}
        className="w-full rounded-xl border border-[#e6dfcf] bg-white px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none sm:w-56"
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { update('stage', ''); }}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            !activeStage
              ? 'bg-[var(--ink)] text-white'
              : 'border border-[#e6dfcf] text-[var(--muted)] hover:bg-[#ece8e0]'
          }`}
        >
          All
        </button>
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => update('stage', activeStage === s ? '' : s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              activeStage === s
                ? 'bg-[var(--ink)] text-white'
                : 'border border-[#e6dfcf] text-[var(--muted)] hover:bg-[#ece8e0]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
