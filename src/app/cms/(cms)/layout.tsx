import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Shell } from '@/components/cms/Shell';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSession();
  if (!user) {
    redirect('/cms/login');
  }
  return <Shell user={user}>{children}</Shell>;
}
