import React from 'react';
import { Control } from 'react-hook-form';

import { type QuestionFormDialogSchema } from '@/schemas/form';

import { Checkbox } from '@repo/core-ui/components/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/core-ui/components/form';
import { Input } from '@repo/core-ui/components/input';

interface QuestionNumberSettingsProps {
  control: Control<QuestionFormDialogSchema>;
}

const QuestionNumberSettings = ({ control }: QuestionNumberSettingsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="required"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Checkbox value={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel>Required</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name="attributes.placeholder"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="attributes.defaultValue"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Default value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === '' ? undefined : parseFloat(value)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FormField
          control={control}
          name="attributes.min"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <div className="flex items-start gap-2">
                <FormControl>
                  <Checkbox
                    value={!!field.value}
                    onCheckedChange={(value: boolean) =>
                      field.onChange(value ? 0 : undefined)
                    }
                  />
                </FormControl>
                <FormLabel>Min value</FormLabel>
              </div>
              {field.value !== undefined && (
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="attributes.max"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <div className="flex items-start gap-2">
                <FormControl>
                  <Checkbox
                    value={!!field.value}
                    onCheckedChange={(value: boolean) =>
                      field.onChange(value ? 100 : undefined)
                    }
                  />
                </FormControl>
                <FormLabel>Max value</FormLabel>
              </div>
              {field.value !== undefined && (
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="attributes.step"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <div className="flex items-start gap-2">
                <FormControl>
                  <Checkbox
                    value={!!field.value}
                    onCheckedChange={(value: boolean) =>
                      field.onChange(value ? 1 : undefined)
                    }
                  />
                </FormControl>
                <FormLabel>Step</FormLabel>
              </div>
              {field.value !== undefined && (
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default QuestionNumberSettings;
