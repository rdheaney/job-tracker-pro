'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOutAction } from '@/app/actions/auth';

const links = [
  { href: '/', label: 'Dashboard', protected: true },
  { href: '/applications', label: 'Applications', protected: true },
  { href: '/login', label: 'Login', protected: false },
];

type NavbarProps = {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const isAuthenticated = Boolean(user?.id);

  return (
    <header className="sticky top-0 z-10 border-b border-[#e6dfcf] bg-[#fffdf8]/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="font-semibold tracking-tight text-[var(--ink)]">
          Job Tracker Pro
        </Link>
        <nav className="flex items-center gap-2">
          {links
            .filter((link) => (link.protected ? isAuthenticated : !isAuthenticated))
            .map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[var(--ink)] text-white'
                    : 'text-[var(--muted)] hover:bg-[#ece8e0]'
                }`}
              >
                {label}
              </Link>
            );
            })}

          {isAuthenticated && (
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--muted)] transition hover:bg-[#ece8e0]"
              >
                Sign Out
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
