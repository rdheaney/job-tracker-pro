import Link from 'next/link';
import { getApplications } from '@/lib/store';
import { DeleteButton } from '@/components/DeleteButton';
import type { Stage } from '@/lib/types';

const stageStyles: Record<Stage, string> = {
  Applied: 'bg-[#e4f2ef] text-[#0d5f59]',
  'Phone Screen': 'bg-[#eef2ff] text-[#3730a3]',
  Interview: 'bg-[#fff2dc] text-[#8b5a0b]',
  Offer: 'bg-[#e8ecf7] text-[#1c3260]',
  Rejected: 'bg-[#fef2f1] text-[#8b2218]',
  Withdrawn: 'bg-[#f4f4f5] text-[#71717a]',
};

export default function ApplicationsPage() {
  const applications = getApplications();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-[var(--ink)]">Applications</h1>
        <Link
          href="/applications/new"
          className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Add Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-3xl border border-[#e6dfcf] bg-[var(--surface)] p-16 text-center">
          <p className="text-[var(--muted)]">No applications yet.</p>
          <Link
            href="/applications/new"
            className="mt-4 inline-block text-sm font-semibold text-[var(--teal)]"
          >
            Add your first one →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-[#e6dfcf] bg-[var(--surface)] shadow-[0_12px_30px_-14px_rgba(21,32,56,0.45)]">
          <table className="w-full min-w-[700px] border-separate border-spacing-y-0 text-left">
            <thead>
              <tr className="border-b border-[#e6dfcf] text-sm text-[var(--muted)]">
                <th className="px-5 py-4 font-medium">Role</th>
                <th className="px-5 py-4 font-medium">Company</th>
                <th className="px-5 py-4 font-medium">Stage</th>
                <th className="px-5 py-4 font-medium">Applied</th>
                <th className="px-5 py-4 font-medium">Follow-Up</th>
                <th className="px-5 py-4 font-medium sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-[#f0ece3] text-sm last:border-0"
                >
                  <td className="px-5 py-4 font-semibold text-[var(--ink)]">{app.role}</td>
                  <td className="px-5 py-4 text-[var(--muted)]">{app.company}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${stageStyles[app.stage]}`}
                    >
                      {app.stage}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[var(--muted)]">{app.appliedOn}</td>
                  <td className="px-5 py-4 text-[var(--muted)]">{app.followUp || '—'}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/applications/${app.id}/edit`}
                        className="rounded-full border border-[#e6dfcf] px-3 py-1 text-xs font-medium text-[var(--ink)] transition hover:bg-[#ece8e0]"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={app.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
