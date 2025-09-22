import React from 'react';
import { Control } from 'react-hook-form';

import { type QuestionFormSchema } from '@/schemas/form';

import { Checkbox } from '@repo/core-ui/components/checkbox';
import { DatePicker } from '@repo/core-ui/components/date-picker';
import {
  FormControl,
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

interface QuestionDateSettingsProps {
  control: Control<QuestionFormSchema>;
}

const QuestionDateSettings = ({ control }: QuestionDateSettingsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 items-start gap-3">
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

        <FormField
          control={control}
          name="attributes.dateFormat"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Date format</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Date format" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
                    <SelectItem value="DD MM, YYYY">DD MM, YYYY</SelectItem>
                    <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={control}
          name="attributes.beforeDate"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Before date</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="attributes.afterDate"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>After date</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default QuestionDateSettings;
