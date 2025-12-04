import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { LockKeyhole } from 'lucide-react';

export default function Unauthorized() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <LockKeyhole className="h-6 w-6 text-muted-foreground" />
          </div>

          <CardTitle className="text-3xl font-semibold">401</CardTitle>
          <CardTitle className="text-xl font-semibold">Unauthorized</CardTitle>

          <CardDescription>
            You {`don't`} have permission to access this page.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Log In</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
