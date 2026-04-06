export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-9 w-48 animate-pulse rounded-xl bg-[#e6dfcf]" />
        <div className="h-9 w-36 animate-pulse rounded-full bg-[#e6dfcf]" />
      </div>
      <div className="mb-6 flex gap-3">
        <div className="h-9 w-56 animate-pulse rounded-xl bg-[#e6dfcf]" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-7 w-20 animate-pulse rounded-full bg-[#e6dfcf]" />
          ))}
        </div>
      </div>
      <div className="h-96 animate-pulse rounded-3xl bg-[#e6dfcf]" />
    </main>
  );
}
