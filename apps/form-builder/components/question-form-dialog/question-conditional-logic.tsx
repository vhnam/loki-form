import React from 'react';
import { Control } from 'react-hook-form';

import { type QuestionFormSchema } from '@/schemas/form';

import type { IForm } from '@repo/form-ui/types/form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/core-ui/components/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

interface QuestionConditionalLogicProps {
  control: Control<QuestionFormSchema>;
  index: number;
  form: IForm;
}

const QuestionConditionalLogic = ({
  control,
  index,
  form,
}: QuestionConditionalLogicProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField
        control={control}
        name={`attributes.options.${index}.conditionalLogic.action`}
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel className="text-xs font-medium">
              If option is selected
            </FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an action" {...field} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visible">Show section</SelectItem>
                  <SelectItem value="hidden">Hide section</SelectItem>
                  <SelectItem value="jumped">Jump to section</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`attributes.options.${index}.conditionalLogic.targetSection`}
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel className="text-xs font-medium">
              Target section
            </FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Target section" {...field} />
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
  );
};

export default QuestionConditionalLogic;
