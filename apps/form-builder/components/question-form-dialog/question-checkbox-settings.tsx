import { PlusIcon } from 'lucide-react';
import React from 'react';
import { Control, useFormContext, useWatch } from 'react-hook-form';

import { type QuestionFormDialogSchema } from '@/schemas/form';

import type { IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import { Checkbox } from '@repo/core-ui/components/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/core-ui/components/form';

import QuestionSelectionOption from './question-selection-option';

interface QuestionCheckboxSettingsProps {
  control: Control<QuestionFormDialogSchema>;
  form: IForm;
}

const QuestionCheckboxSettings = ({
  control,
  form,
}: QuestionCheckboxSettingsProps) => {
  const { setValue, getValues } = useFormContext<QuestionFormDialogSchema>();

  // Get options from React Hook Form values
  const options = useWatch({
    control,
    name: 'attributes.options',
    defaultValue: [{ label: '', value: '', disabled: false }],
  });

  const addOption = () => {
    const currentOptions = getValues('attributes.options') || [];
    setValue('attributes.options', [
      ...currentOptions,
      { label: '', value: '', disabled: false },
    ]);
  };

  const removeOption = (index: number) => {
    const currentOptions = getValues('attributes.options') || [];
    const newOptions = currentOptions.filter((_, i) => i !== index);
    setValue('attributes.options', newOptions);
  };

  return (
    <>
      <FormField
        control={control}
        name="required"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Required</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <h3 className="text-muted-foreground text-sm font-medium">Options</h3>

      <div className="grid gap-3">
        {options?.map((option, index) => (
          <QuestionSelectionOption
            key={`option-${index}`}
            control={control}
            index={index}
            form={form}
            onRemove={removeOption}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addOption}
        className="w-full"
      >
        <PlusIcon className="size-4" />
        Add Option
      </Button>
    </>
  );
};

export default QuestionCheckboxSettings;
