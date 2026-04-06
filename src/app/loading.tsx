export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-10 md:px-8">
      <div className="h-48 animate-pulse rounded-3xl bg-[#e6dfcf]" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#e6dfcf]" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-3xl bg-[#e6dfcf]" />
      <div className="h-64 animate-pulse rounded-3xl bg-[#e6dfcf]" />
    </main>
  );
}
