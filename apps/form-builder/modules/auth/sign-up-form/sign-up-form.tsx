'use client';

import { Loader2Icon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
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

import useSignUpFormActions from './sign-up-form.actions';

const orderFields = (fields: string[], locale: string) =>
  fields.sort(
    locale === 'en-US'
      ? (a, b) => a.localeCompare(b) // English: firstName, lastName
      : (a, b) => b.localeCompare(a) // Vietnamese: lastName, firstName
  );

const SignUpForm = () => {
  const { form, onSubmit, isPending } = useSignUpFormActions();
  const t = useTranslations('authPage');
  const locale = useLocale();
  const nameFields = orderFields(['firstName', 'lastName'], locale);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('register.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-6">
                {nameFields.map((fieldName) => (
                  <div className="grid gap-3" key={fieldName}>
                    <FormField
                      control={form.control}
                      name={fieldName as 'firstName' | 'lastName'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t(`register.form.${fieldName}.label`)}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t(
                                `register.form.${fieldName}.placeholder`
                              )}
                              type={
                                fieldName === 'password' ? 'password' : 'text'
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('register.form.email.label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('register.form.email.placeholder')}
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
                            {t('register.form.password.label')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t(
                                'register.form.password.placeholder'
                              )}
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
                      {t('register.actions.forgotPassword')}
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    t('register.actions.signUp')
                  )}
                </Button>
              </div>

              <div className="text-center text-sm">
                {t('register.suggestion')}{' '}
                <Link
                  href={PUBLIC_ROUTES.auth.signIn}
                  className="underline underline-offset-4"
                >
                  {t('register.actions.signIn')}
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
