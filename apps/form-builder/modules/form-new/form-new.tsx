'use client';

import {
  ChevronsUpDown,
  Edit2Icon,
  EditIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { QuestionType } from '@repo/form-ui/enums/question';

import { IField, IForm } from '@repo/form-ui/types/form';

import QuestionFormDialog from '@/components/question-form-dialog';

import { Badge } from '@repo/core-ui/components/badge';
import { Button } from '@repo/core-ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/core-ui/components/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/core-ui/components/collapsible';
import { Form } from '@repo/core-ui/components/form';

import QuestionTypeBadge from '@repo/form-ui/components/question-type-badge';

import { PrivateLayoutHeader } from '@/layouts/private';

import useFormNewActions from './form-new.actions';

const FormNew = () => {
  const t = useTranslations('formBuilderPage');

  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const {
    form,
    addQuestion,
    editQuestion,
    deleteQuestion,
    addSection,
    deleteSection,
  } = useFormNewActions();

  const formData = form.watch();
  const sectionsData = form.watch('sections');

  return (
    <Form {...form}>
      <PrivateLayoutHeader
        title={t('header.title.new')}
        actions={
          <div className="flex items-center gap-2">
            <Link href={PRIVATE_ROUTES.forms.list}>
              <Button variant="outline" type="button">
                {t('header.actions.cancel')}
              </Button>
            </Link>
            <Button type="submit" variant="default">
              {t('header.actions.save')}
            </Button>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-4xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>{formData.title}</CardTitle>
            <CardDescription>{formData.description}</CardDescription>
            <CardAction>
              <Button variant="ghost">
                <EditIcon /> {t('form.actions.editForm')}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sectionsData?.map((section) => (
                <Collapsible
                  open={openSections.has(section.id)}
                  onOpenChange={() => {
                    setOpenSections((prev) => {
                      const newSet = new Set(prev);
                      if (newSet.has(section.id)) {
                        newSet.delete(section.id);
                      } else {
                        newSet.add(section.id);
                      }
                      return newSet;
                    });
                  }}
                  className="flex w-full flex-col gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-700"
                  key={section.id}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium dark:text-gray-100">
                        {section.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <ChevronsUpDown />
                          <span className="sr-only">
                            {t('form.actions.toggleSection')}
                          </span>
                        </Button>
                      </CollapsibleTrigger>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        disabled={sectionsData.length === 1}
                        onClick={() => deleteSection(section.id)}
                      >
                        <TrashIcon />
                        <span className="sr-only">
                          {t('form.actions.deleteSection')}
                        </span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => {
                          // TODO: Implement section edit dialog
                          // For now, just log the section ID
                          console.log('Edit section:', section.id);
                          // editSection would be called here with updated section data
                        }}
                      >
                        <Edit2Icon />
                        <span className="sr-only">
                          {t('form.actions.editSection')}
                        </span>
                      </Button>

                      <QuestionFormDialog
                        form={formData as unknown as IForm}
                        onAddQuestion={addQuestion}
                        onEditQuestion={editQuestion}
                        onDeleteQuestion={deleteQuestion}
                        triggerComponent={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <PlusIcon />
                            <span className="sr-only">
                              {t('form.actions.addQuestion')}
                            </span>
                          </Button>
                        }
                      />
                    </div>
                  </div>

                  <CollapsibleContent>
                    <div className="space-y-2">
                      {section.fields?.length === 0 && (
                        <div className="flex items-center justify-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('form.actions.noQuestions')}
                          </p>
                        </div>
                      )}
                      {section.fields?.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center border-t border-gray-200 pt-2 text-sm dark:border-gray-700 dark:text-gray-300"
                        >
                          <div className="w-1/6">
                            {
                              <QuestionTypeBadge
                                type={field.type as QuestionType}
                              />
                            }
                          </div>
                          <div className="w-2/6">{field.label}</div>
                          <div className="w-1/6">
                            {!field.required && (
                              <Badge variant="secondary">Optional</Badge>
                            )}
                          </div>
                          <div className="w-2/6">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  deleteQuestion(field.id, section.id);
                                }}
                              >
                                Delete
                              </Button>
                              <QuestionFormDialog
                                form={formData as unknown as IForm}
                                question={field as IField}
                                onAddQuestion={addQuestion}
                                onEditQuestion={editQuestion}
                                onDeleteQuestion={deleteQuestion}
                                triggerComponent={
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="mt-4 w-full border-2 border-dashed border-gray-300 py-8 text-gray-600 hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-blue-400"
              onClick={addSection}
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              {t('form.actions.addSection')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
};

export default FormNew;
