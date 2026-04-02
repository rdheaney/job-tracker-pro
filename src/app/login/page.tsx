'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/actions/auth';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(authenticate, {});

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-5 py-14 md:px-8">
      <section className="w-full rounded-3xl border border-[#e6dfcf] bg-[var(--surface)] p-7 shadow-[0_12px_30px_-14px_rgba(21,32,56,0.45)]">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Job Tracker Pro
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--ink)]">Sign In</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Demo account: demo@jobtracker.dev / password123
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-[var(--ink)]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="demo@jobtracker.dev"
              className="rounded-xl border border-[#e6dfcf] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-[var(--ink)]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue="password123"
              className="rounded-xl border border-[#e6dfcf] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--teal)] focus:outline-none"
            />
          </div>

          {state.error && <p className="text-sm text-[var(--rose)]">{state.error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}
