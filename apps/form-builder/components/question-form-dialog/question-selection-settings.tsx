import { PlusIcon } from 'lucide-react';
import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';

import { type QuestionFormSchema } from '@/schemas/form';

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
import { Input } from '@repo/core-ui/components/input';

import QuestionSelectionOption from './question-selection-option';

interface QuestionSelectionSettingsProps {
  control: Control<QuestionFormSchema>;
  form: IForm;
}

const QuestionSelectionSettings = ({
  control,
  form,
}: QuestionSelectionSettingsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes.options',
  });

  const addOption = () => {
    append({
      label: '',
      value: '',
      disabled: false,
    });
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
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <FormField
            control={control}
            name="attributes.minSelected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min selected</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
            name="attributes.maxSelected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max selected</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <h3 className="text-muted-foreground text-sm font-medium">Options</h3>

      <div className="grid gap-3">
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-center text-sm">
            No options yet
          </p>
        ) : (
          fields.map((field, index) => (
            <QuestionSelectionOption
              key={field.id}
              control={control}
              index={index}
              form={form}
              onRemove={remove}
            />
          ))
        )}
      </div>

      <Button type="button" variant="outline" onClick={addOption}>
        <PlusIcon className="size-4" />
        Add Option
      </Button>
    </>
  );
};

export default QuestionSelectionSettings;
