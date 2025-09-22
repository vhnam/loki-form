import { FileSlidersIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import { Control } from 'react-hook-form';

import { type QuestionFormSchema } from '@/schemas/form';

import type { IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/core-ui/components/form';
import { Input } from '@repo/core-ui/components/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/core-ui/components/tooltip';

import QuestionConditionalLogic from './question-conditional-logic';

interface QuestionSelectionOptionProps {
  control: Control<QuestionFormSchema>;
  index: number;
  form: IForm;
  onRemove: (index: number) => void;
}

const QuestionSelectionOption = ({
  control,
  index,
  form,
  onRemove,
}: QuestionSelectionOptionProps) => {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <GripVerticalIcon className="size-4 cursor-grab" />
        <FormField
          control={control}
          name={`attributes.options.${index}.label`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <FileSlidersIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle conditional logic</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove(index)}
            >
              <TrashIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove option</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <QuestionConditionalLogic control={control} index={index} form={form} />
    </div>
  );
};

export default QuestionSelectionOption;
