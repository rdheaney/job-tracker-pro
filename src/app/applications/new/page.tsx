import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { ApplicationForm } from '@/components/ApplicationForm';
import { createApplicationAction } from '@/app/actions/applications';

export default async function NewApplicationPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 md:px-8">
      <Link
        href="/applications"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← Applications
      </Link>
      <h1 className="mb-8 text-3xl font-semibold text-[var(--ink)]">New Application</h1>
      <div className="rounded-3xl border border-[#e6dfcf] bg-[var(--surface)] p-6 shadow-[0_12px_30px_-14px_rgba(21,32,56,0.45)] md:p-8">
        <ApplicationForm action={createApplicationAction} />
      </div>
    </main>
  );
}
