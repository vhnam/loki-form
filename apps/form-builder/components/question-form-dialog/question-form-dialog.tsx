import { useTranslations } from 'next-intl';
import React, { type ReactNode, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { extractAttributes } from '@repo/form-ui/utils/field';

import { type QuestionFormDialogSchema } from '@/schemas/form';

import { QuestionType } from '@repo/form-ui/enums/question';

import type { IField, IFieldAttributes, IForm } from '@repo/form-ui/types/form';

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
import QuestionNumberSettings from './question-number-settings';
import QuestionSelectionSettings from './question-selection-settings';

interface QuestionFormDialogProps {
  form: IForm;
  question?: IField;
  onAddQuestion?: (questionData: QuestionFormDialogSchema) => void;
  onEditQuestion?: (questionData: QuestionFormDialogSchema) => void;
  onDeleteQuestion?: (questionId: string, sectionId: string) => void;
  triggerComponent: ReactNode;
}

const QuestionFormDialog = ({
  form,
  question,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  triggerComponent,
}: QuestionFormDialogProps) => {
  const isEdit = !!question;
  const [open, setOpen] = useState(false);

  const t = useTranslations('formBuilderPage.question');

  const { hookForm } = useQuestionFormDialogActions({ form, question });

  const questionData = useWatch({
    control: hookForm.control,
  });

  const handleOpenDialogChange = (open: boolean) => {
    setOpen(open);

    if (open && !isEdit) {
      hookForm.reset();
    }
  };

  const onSubmit = (data: QuestionFormDialogSchema) => {
    const extractedAttributes = extractAttributes(
      questionData.type as QuestionType,
      data.attributes as IFieldAttributes
    );
    const questionId = isEdit ? question?.id : uuidv4();
    const newQuestion: QuestionFormDialogSchema = {
      ...data,
      id: questionId,
      attributes: extractedAttributes as QuestionFormDialogSchema['attributes'],
    };

    if (isEdit) {
      onEditQuestion?.(newQuestion);
      toast.success(t('messages.edit', { label: data.label! }));
    } else {
      onAddQuestion?.(newQuestion);
      toast.success(t('messages.add', { label: data.label! }));
    }

    setOpen(false);
  };

  return (
    <Form {...hookForm}>
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
                    name="label"
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
                ].includes(questionData.type as QuestionType) && (
                  <QuestionInputSettings control={hookForm.control} />
                )}

                {questionData.type === QuestionType.NUMBER && (
                  <QuestionNumberSettings control={hookForm.control} />
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
              {isEdit && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    if (question && onDeleteQuestion) {
                      onDeleteQuestion(question.id, question.sectionId);
                      // Close dialog after successful deletion
                      setOpen(false);
                    }
                  }}
                >
                  {t('actions.delete')}
                </Button>
              )}
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {t('actions.cancel')}
                  </Button>
                </DialogClose>
                <Button type="submit">{t('actions.finish')}</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default QuestionFormDialog;
