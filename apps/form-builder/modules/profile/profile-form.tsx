import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { forwardRef, useImperativeHandle, useTransition } from 'react';
import { toast } from 'sonner';

import { useClientOnly } from '@repo/core-ui/hooks/use-client-only';

import { ProfileFormSchema } from '@/schemas/profile';

import { type User } from '@/types/user';

import { profileQueryKey } from '@/services/auth';
import { setUserLocale } from '@/services/locale';

import { Spinner } from '@/components/spinner';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/core-ui/components/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/core-ui/components/form';
import { Input } from '@repo/core-ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

import { type Locale } from '@/i18n/config';

import useProfileFormActions from './profile.actions';

interface ProfileFormProps {
  user: User;
}

export interface ProfileFormRef {
  isSubmitting: boolean;
  submit: () => void;
}

const ProfileForm = forwardRef<ProfileFormRef, ProfileFormProps>(
  ({ user }, ref) => {
    const { setTheme } = useTheme();
    const queryClient = useQueryClient();
    const hasMounted = useClientOnly();
    const {
      form,
      onSubmit,
      isPending: isSubmitting,
    } = useProfileFormActions({ user });
    const t = useTranslations('profilePage');
    const [isPending, startTransition] = useTransition();

    useImperativeHandle(ref, () => ({
      submit: form.handleSubmit(handleFormSubmit),
      isSubmitting,
    }));

    const handleFormSubmit = async (payload: ProfileFormSchema) => {
      try {
        const response = await onSubmit(payload);
        await queryClient.invalidateQueries({
          queryKey: profileQueryKey.getProfile,
        });

        startTransition(() => {
          setTheme(response.interfaceMode);
          setUserLocale(response.interfaceLanguage as Locale);
          toast.success(t('actions.update.success'));
        });
      } catch (error) {
        toast.error(t('actions.update.error'));
        console.log(error);
      }
    };

    if (!hasMounted) {
      return <Spinner />;
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('profile.firstName.label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('profile.firstName.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('profile.lastName.label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('profile.lastName.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('profile.email.label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('profile.email.placeholder')}
                            disabled
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          {t('profile.email.description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('experience.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="interfaceLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('experience.language.label')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en-US">
                                {t('experience.language.options.en-US')}
                              </SelectItem>
                              <SelectItem value="vi-VN">
                                {t('experience.language.options.vi-VN')}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription className="text-xs">
                          {t('experience.language.description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="interfaceMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('experience.mode.label')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">
                                {t('experience.mode.options.light')}
                              </SelectItem>
                              <SelectItem value="dark">
                                {t('experience.mode.options.dark')}
                              </SelectItem>
                              <SelectItem value="system">
                                {t('experience.mode.options.system')}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription className="text-xs">
                          {t('experience.mode.description')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    );
  }
);

ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;
