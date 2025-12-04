'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import PasswordInput from '@/components/ui/password-input';
import { signUpSchema, SignUpType } from '@/validations/signUp.schema';

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
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/auth-client';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ name, email, password }: SignUpType) => {
    setIsLoading(true);
    setAuthError(null);

    const { error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      setAuthError(error.message || 'Something went wrong');
      toast.error(error.message || 'Something went wrong');
    } else {
      toast.success('Account created successfully');
      router.push('/');
    }

    setIsLoading(false);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* NAME */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                {...register('name')}
                id="name"
                type="text"
                placeholder="Ahmad Test"
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput {...register('password')} id="password" />
              <FieldError>{errors.password?.message}</FieldError>

              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            {/* SERVER ERROR */}
            {authError && (
              <FieldError className="mt-2 text-red-600">{authError}</FieldError>
            )}

            {/* SUBMIT BUTTON */}
            <Field>
              <Button type="submit" disabled={isSubmitting || isLoading}>
                {isLoading ? 'Loading...' : 'Create Account'}
              </Button>

              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
