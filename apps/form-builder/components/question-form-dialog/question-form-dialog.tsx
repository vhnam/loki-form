import { useTranslations } from 'next-intl';
import React, { type ReactNode } from 'react';
import { useWatch } from 'react-hook-form';

import { type QuestionFormDialogSchema } from '@/schemas/form';

import { QuestionType } from '@repo/form-ui/enums/question';

import type { IField, IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/core-ui/components/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/core-ui/components/form';
import { Input } from '@repo/core-ui/components/input';
import { ScrollArea } from '@repo/core-ui/components/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';
import { Separator } from '@repo/core-ui/components/separator';
import { Textarea } from '@repo/core-ui/components/textarea';

import QuestionCheckboxSettings from './question-checkbox-settings';
// import QuestionDateSettings from './question-date-settings';
import useQuestionFormDialogActions from './question-form-dialog.actions';
import QuestionInputSettings from './question-input-settings';
import QuestionSelectionSettings from './question-selection-settings';

interface QuestionFormDialogProps {
  form: IForm;
  question?: IField;
  triggerComponent: ReactNode;
}

const QuestionFormDialog = ({
  form,
  question,
  triggerComponent,
}: QuestionFormDialogProps) => {
  const isEdit = !!question;

  const t = useTranslations('formBuilderPage.question');

  const { hookForm } = useQuestionFormDialogActions({ form, question });

  const questionData = useWatch({
    control: hookForm.control,
  });

  const onSubmit = (data: QuestionFormDialogSchema) => {
    console.log('Form submitted:', data);
    // TODO: Implement form submission logic
  };

  return (
    <Form {...hookForm}>
      <Dialog>
        <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEdit
                ? t('sections.description.title.edit')
                : t('sections.description.title.add')}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? t('sections.description.description.edit')
                : t('sections.description.description.add')}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <form onSubmit={hookForm.handleSubmit(onSubmit)}>
            <ScrollArea className="-mr-6 h-[50vh] pr-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={hookForm.control}
                    name="sectionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('section.label')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={t('section.placeholder')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {form.sections.map((section) => (
                                <SelectItem key={section.id} value={section.id}>
                                  {section.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={hookForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('type.label')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={t('type.placeholder')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                              <SelectItem value="radio">Radio</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                              <SelectItem value="file">File</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={hookForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('title.label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('title.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={hookForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('description.label')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('description.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={hookForm.control}
                    name="helperText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('helperText.label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('helperText.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <h3 className="text-muted-foreground text-sm font-medium">
                  {t('sections.settings.title')}
                </h3>

                {[
                  QuestionType.TEXT,
                  QuestionType.TEXTAREA,
                  QuestionType.EMAIL,
                  QuestionType.NUMBER,
                ].includes(questionData.type as QuestionType) && (
                  <QuestionInputSettings control={hookForm.control} />
                )}

                {/* {questionData.type === QuestionType.DATE && (
                  <QuestionDateSettings question={question} />
                )} */}

                {questionData.type === QuestionType.CHECKBOX && (
                  <QuestionCheckboxSettings
                    control={hookForm.control}
                    form={form}
                  />
                )}

                {[QuestionType.RADIO, QuestionType.SELECT].includes(
                  questionData.type as QuestionType
                ) && (
                  <QuestionSelectionSettings
                    control={hookForm.control}
                    form={form}
                  />
                )}
              </div>
            </ScrollArea>
            <DialogFooter className="w-full sm:justify-between">
              <Button type="button" variant="destructive">
                {t('actions.delete')}
              </Button>
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {t('actions.cancel')}
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={() => {
                    console.log(questionData);
                    console.log(hookForm.formState);
                  }}
                >
                  {t('actions.finish')}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default QuestionFormDialog;
