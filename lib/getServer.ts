import { headers } from 'next/headers';
import { auth } from './auth';

export default async function getServer() {
  const session = await auth.api.getSession({ headers: await headers() });

  return session;
}
