'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-ink"
    >
      Sign out
    </button>
  );
}
