import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ApplicationForm } from '@/components/ApplicationForm';
import { updateApplicationAction } from '@/app/actions/applications';
import { getApplication } from '@/lib/store';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditApplicationPage({ params }: Props) {
  const { id } = await params;
  const application = getApplication(id);
  if (!application) notFound();

  // Bind the id so the Server Action receives it as the first argument.
  // This is the idiomatic pattern before switching to a DB in Milestone 3.
  const action = updateApplicationAction.bind(null, application.id);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 md:px-8">
      <Link
        href="/applications"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← Applications
      </Link>
      <h1 className="mb-8 text-3xl font-semibold text-[var(--ink)]">Edit Application</h1>
      <div className="rounded-3xl border border-[#e6dfcf] bg-[var(--surface)] p-6 shadow-[0_12px_30px_-14px_rgba(21,32,56,0.45)] md:p-8">
        <ApplicationForm action={action} defaultValues={application} />
      </div>
    </main>
  );
}
