import { useTranslations } from 'next-intl';
import React, { type ReactNode, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import {
  generateCreateFormValues,
  generateEditFormValues,
} from '@/constants/forms';

import { extractAttributes } from '@repo/form-ui/utils/field';

import type { FormBuilderSchema, QuestionFormSchema } from '@/schemas/form';

import { QuestionType } from '@repo/form-ui/enums/question';

import type {
  IField,
  IFieldAttributes,
  IForm,
  ISection,
} from '@repo/form-ui/types/form';

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
import QuestionDateSettings from './question-date-settings';
import QuestionInputSettings from './question-input-settings';
import QuestionNumberSettings from './question-number-settings';
import QuestionSelectionSettings from './question-selection-settings';

interface QuestionFormDialogProps {
  form: IForm;
  section: ISection;
  question?: IField;
  triggerComponent: ReactNode;
  control: Control<FormBuilderSchema>;
  setValue: UseFormSetValue<FormBuilderSchema>;
  onAddQuestion?: (questionData: QuestionFormSchema) => void;
  onEditQuestion?: (questionData: QuestionFormSchema) => void;
  onDeleteQuestion?: (questionId: string, sectionId: string) => void;
}

const QuestionFormDialog = ({
  form,
  section,
  question,
  triggerComponent,
  control,
  setValue,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
}: QuestionFormDialogProps) => {
  const isEdit = !!question;
  const [open, setOpen] = useState(false);

  const t = useTranslations('formBuilderPage.question');

  const questionId = useMemo(() => question?.id || uuidv4(), [question?.id]);

  const questionData = useWatch({
    control,
    name: `sections.${section.id}.fields.${questionId}`,
  }) as QuestionFormSchema;

  const handleOpenDialogChange = (open: boolean) => {
    setOpen(open);

    if (open && !isEdit) {
      setValue(
        `sections.${section.id}.fields.${questionId}`,
        generateCreateFormValues({ section, questionId })
      );
    } else if (open && isEdit && question) {
      setValue(
        `sections.${section.id}.fields.${questionId}`,
        generateEditFormValues({ question })
      );
    }
  };

  const handleSubmit = () => {
    if (!questionData) return;

    const extractedAttributes = extractAttributes(
      questionData.type as QuestionType,
      questionData.attributes as IFieldAttributes
    );

    const newQuestion: QuestionFormSchema = {
      ...questionData,
      attributes: extractedAttributes as QuestionFormSchema['attributes'],
    };

    if (isEdit) {
      onEditQuestion?.(newQuestion);
      toast.success(t('messages.edit', { label: questionData.label! }));
    } else {
      onAddQuestion?.(newQuestion);
      toast.success(t('messages.add', { label: questionData.label! }));
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialogChange}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {triggerComponent}
      </DialogTrigger>
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

        <div>
          <ScrollArea className="-mr-6 h-[50vh] pr-6">
            <div className="grid gap-6 pb-6">
              <div className="grid gap-3">
                <FormField
                  control={control}
                  name={`sections.${section.id}.fields.${questionId}.sectionId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('section.label')}</FormLabel>
                      <FormControl>
                        <Select
                          disabled={!isEdit}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t('section.placeholder')}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(form.sections).map((section) => (
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
                  control={control}
                  name={`sections.${section.id}.fields.${questionId}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('type.label')}</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t('type.placeholder')} />
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
                  control={control}
                  name={`sections.${section.id}.fields.${questionId}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('label.label')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('label.placeholder')}
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
                  control={control}
                  name={`sections.${section.id}.fields.${questionId}.description`}
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
                  control={control}
                  name={`sections.${section.id}.fields.${questionId}.helperText`}
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
              ].includes(questionData?.type as QuestionType) && (
                <QuestionInputSettings
                  control={control as unknown as Control<QuestionFormSchema>}
                />
              )}

              {questionData?.type === QuestionType.NUMBER && (
                <QuestionNumberSettings
                  control={control as unknown as Control<QuestionFormSchema>}
                />
              )}

              {questionData?.type === QuestionType.DATE && (
                <QuestionDateSettings
                  control={control as unknown as Control<QuestionFormSchema>}
                />
              )}

              {questionData?.type === QuestionType.CHECKBOX && (
                <QuestionCheckboxSettings
                  control={control as unknown as Control<QuestionFormSchema>}
                  form={form}
                />
              )}

              {[QuestionType.RADIO, QuestionType.SELECT].includes(
                questionData?.type as QuestionType
              ) && (
                <QuestionSelectionSettings
                  control={control as unknown as Control<QuestionFormSchema>}
                  form={form}
                />
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="w-full pt-6 sm:justify-between">
            <div>
              {isEdit && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    if (question && onDeleteQuestion) {
                      onDeleteQuestion(question.id, question.sectionId);
                      setOpen(false);
                    }
                  }}
                >
                  {t('actions.delete')}
                </Button>
              )}
            </div>
            <div className="flex items-center justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t('actions.cancel')}
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleSubmit}>
                {t('actions.finish')}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionFormDialog;
