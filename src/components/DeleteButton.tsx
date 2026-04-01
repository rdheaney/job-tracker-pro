'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteApplicationAction } from '@/app/actions/applications';

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!confirm('Delete this application?')) return;
    startTransition(async () => {
      await deleteApplicationAction(id);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-full border border-[#f5c6c4] px-3 py-1 text-xs font-medium text-[var(--rose)] transition hover:bg-[#fef2f1] disabled:opacity-50"
    >
      {isPending ? 'Deleting…' : 'Delete'}
    </button>
  );
}
