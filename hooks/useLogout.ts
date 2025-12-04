import { signOut } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

export async function useLogout() {
  await signOut();
  redirect('/login');
}
