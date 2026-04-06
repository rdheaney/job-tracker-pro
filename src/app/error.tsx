'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-5 py-20">
      <p className="text-lg font-semibold text-[var(--ink)]">Something went wrong</p>
      <p className="text-sm text-[var(--muted)]">{error.message ?? 'An unexpected error occurred.'}</p>
      <button
        onClick={unstable_retry}
        className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}
