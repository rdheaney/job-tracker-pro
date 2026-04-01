export default function Home() {
  const stats = [
    { label: "Applied", value: 38, color: "bg-[#127a72]" },
    { label: "Interviews", value: 12, color: "bg-[#f3b34b]" },
    { label: "Offers", value: 3, color: "bg-[#152038]" },
    { label: "Response Rate", value: "31%", color: "bg-[#d35f57]" },
  ];

  const applications = [
    {
      role: "Frontend Engineer",
      company: "Northbeam Labs",
      stage: "Interview",
      appliedOn: "Mar 22",
      followUp: "Apr 03",
    },
    {
      role: "React Developer",
      company: "Pocketbase",
      stage: "Applied",
      appliedOn: "Mar 27",
      followUp: "Apr 04",
    },
    {
      role: "Product Engineer",
      company: "Aster Studio",
      stage: "Offer",
      appliedOn: "Mar 14",
      followUp: "Apr 01",
    },
  ];

  const stageStyles: Record<string, string> = {
    Applied: "bg-[#e4f2ef] text-[#0d5f59]",
    Interview: "bg-[#fff2dc] text-[#8b5a0b]",
    Offer: "bg-[#e8ecf7] text-[#1c3260]",
  };

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
          <button className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:opacity-90">
            Add Application
          </button>
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
          <a href="#" className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
            View all
          </a>
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
                <tr key={`${app.role}-${app.company}`} className="rounded-xl bg-white text-sm">
                  <td className="rounded-l-xl px-3 py-4 font-semibold text-[var(--ink)]">{app.role}</td>
                  <td className="px-3 py-4 text-[var(--muted)]">{app.company}</td>
                  <td className="px-3 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stageStyles[app.stage]}`}>
                      {app.stage}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-[var(--muted)]">{app.appliedOn}</td>
                  <td className="rounded-r-xl px-3 py-4 text-[var(--muted)]">{app.followUp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
