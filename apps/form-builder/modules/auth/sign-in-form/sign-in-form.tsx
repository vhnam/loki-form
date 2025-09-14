'use client';

import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { PUBLIC_ROUTES } from '@/constants/routes';

import { Button } from '@repo/core-ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/core-ui/components/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/core-ui/components/form';
import { Input } from '@repo/core-ui/components/input';

import useSignInFormActions from './sign-in-form.actions';

const SignInForm = () => {
  const { form, onSubmit, isPending } = useSignInFormActions();
  const t = useTranslations('authPage');

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('login.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('login.form.email.label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('login.form.email.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t('login.form.password.label')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('login.form.password.placeholder')}
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Link
                      href={PUBLIC_ROUTES.auth.forgotPassword}
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      {t('login.actions.forgotPassword')}
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    t('login.actions.signIn')
                  )}
                </Button>
              </div>

              <div className="text-center text-sm">
                {t('login.suggestion')}{' '}
                <Link
                  href={PUBLIC_ROUTES.auth.signUp}
                  className="underline underline-offset-4"
                >
                  {t('login.actions.signUp')}
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
