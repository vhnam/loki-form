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
  CardDescription,
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

import useForgotPasswordFormActions from './forgot-password-form.actions';

const ForgotPasswordForm = () => {
  const { form, onSubmit, isPending } = useForgotPasswordFormActions();
  const t = useTranslations('authPage');

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('forgotPassword.title')}</CardTitle>
        <CardDescription>{t('forgotPassword.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('forgotPassword.form.email.label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            'forgotPassword.form.email.placeholder'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  t('forgotPassword.actions.resetPassword')
                )}
              </Button>
            </div>
            <div className="text-center text-sm">
              {t('forgotPassword.suggestion')}{' '}
              <Link
                href={PUBLIC_ROUTES.auth.signUp}
                className="underline underline-offset-4"
              >
                {t('forgotPassword.actions.signUp')}
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
