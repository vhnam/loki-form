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

interface QuestionInputSettingsProps {
  control: Control<QuestionFormDialogSchema>;
}

const QuestionInputSettings = ({ control }: QuestionInputSettingsProps) => {
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
                <Input value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="attributes.placeholder"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Default value</FormLabel>
              <FormControl>
                <Input value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name="attributes.minLength"
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
                <FormLabel>Min length</FormLabel>
              </div>
              {field.value !== undefined && (
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value || ''}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="attributes.maxLength"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <div className="flex items-start gap-2">
                <FormControl>
                  <Checkbox
                    value={!!field.value}
                    onCheckedChange={(value: boolean) =>
                      field.onChange(value ? 255 : undefined)
                    }
                  />
                </FormControl>
                <FormLabel>Max length</FormLabel>
              </div>
              {field.value !== undefined && (
                <FormControl>
                  <Input
                    type="number"
                    placeholder="255"
                    value={field.value || ''}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 255)
                    }
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

export default QuestionInputSettings;
