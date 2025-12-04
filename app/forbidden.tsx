import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="max-w-md w-full text-center shadow-sm">
        <CardHeader>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">403 - Forbidden</CardTitle>
          <CardDescription>
            لا تملك صلاحية الوصول إلى هذه الصفحة أو هذا المحتوى.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            إذا كنت تعتقد أن هذا خطأ، تواصل مع المسؤول أو جرّب تسجيل الدخول
            بحساب آخر.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild variant="default">
            <Link href="/">العودة للصفحة الرئيسية</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">تسجيل الدخول</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
