import Layout from '@/components/layout';
import SSEListener from '@/components/SSEListener';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Layout>
      <SSEListener />
      {children}
    </Layout>
  );
}
