'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInSchema, SignInType } from '@/validations/signIn.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import PasswordInput from '@/components/ui/password-input';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }: SignInType) => {
    setIsLoading(true);
    setAuthError(null);

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      setAuthError(error.message || 'Something went wrong');
      toast.error(error.message || 'Something went wrong');
    } else {
      toast.success('Logged in successfully');
      router.push('/');
    }

    setIsLoading(false);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* EMAIL */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                <FieldError>{errors.email?.message}</FieldError>
              </Field>

              {/* PASSWORD */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>

                <PasswordInput {...register('password')} id="password" />

                <FieldError>{errors.password?.message}</FieldError>

                {/* Server error */}
                {authError && <FieldError>{authError}</FieldError>}
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>

                <FieldDescription className="text-center">
                  Don’t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
