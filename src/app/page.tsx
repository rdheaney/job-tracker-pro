import Link from "next/link";
import { listApplications } from "@/lib/applications";
import type { Stage } from "@/lib/types";

export const dynamic = 'force-dynamic';

const stageStyles: Record<Stage, string> = {
  Applied: "bg-[#e4f2ef] text-[#0d5f59]",
  "Phone Screen": "bg-[#eef2ff] text-[#3730a3]",
  Interview: "bg-[#fff2dc] text-[#8b5a0b]",
  Offer: "bg-[#e8ecf7] text-[#1c3260]",
  Rejected: "bg-[#fef2f1] text-[#8b2218]",
  Withdrawn: "bg-[#f4f4f5] text-[#71717a]",
};

export default async function Home() {
  const all = await listApplications();
  const total = all.length;
  const interviews = all.filter((a) => a.stage === "Interview").length;
  const offers = all.filter((a) => a.stage === "Offer").length;
  const responded = all.filter((a) => a.stage !== "Applied").length;
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  const stats = [
    { label: "Applied", value: total, color: "bg-[#127a72]" },
    { label: "Interviews", value: interviews, color: "bg-[#f3b34b]" },
    { label: "Offers", value: offers, color: "bg-[#152038]" },
    { label: "Response Rate", value: `${responseRate}%`, color: "bg-[#d35f57]" },
  ];

  const applications = all.slice(0, 3);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-10 md:px-8">
      <section className="card-enter rounded-3xl border border-[#e6dfcf] bg-[var(--surface)] p-6 shadow-[0_12px_30px_-14px_rgba(21,32,56,0.45)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Job Tracker Pro
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
              Build a focused application pipeline, not a chaotic spreadsheet.
            </h1>
            <p className="mt-3 text-base text-[var(--muted)] md:text-lg">
              This starter dashboard is your React and Next.js portfolio foundation.
              Next step is wiring real data with a database and auth.
            </p>
          </div>
          <Link
            href="/applications/new"
            className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:opacity-90"
          >
            Add Application
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((item, index) => (
          <article
            key={item.label}
            className={`card-enter stagger-${index} rounded-2xl p-4 text-white shadow-sm ${item.color}`}
          >
            <p className="text-xs uppercase tracking-wide text-white/85">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="card-enter stagger-2 rounded-3xl border border-[#e6dfcf] bg-[var(--surface)] p-6 shadow-[0_12px_30px_-14px_rgba(21,32,56,0.45)]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[var(--ink)]">Recent Applications</h2>
          <Link href="/applications" className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)]">
            View all
          </Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="text-sm text-[var(--muted)]">
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Company</th>
                <th className="px-3 py-2 font-medium">Stage</th>
                <th className="px-3 py-2 font-medium">Applied</th>
                <th className="px-3 py-2 font-medium">Follow-Up</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="rounded-xl bg-white text-sm">
                  <td className="rounded-l-xl px-3 py-4 font-semibold text-[var(--ink)]">{app.role}</td>
                  <td className="px-3 py-4 text-[var(--muted)]">{app.company}</td>
                  <td className="px-3 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stageStyles[app.stage]}`}>
                      {app.stage}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-[var(--muted)]">{app.appliedOn}</td>
                  <td className="rounded-r-xl px-3 py-4 text-[var(--muted)]">{app.followUp || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
