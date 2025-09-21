import React from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { Checkbox } from '@repo/core-ui/components/checkbox';
import { DatePicker } from '@repo/core-ui/components/date-picker';
import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

interface QuestionDateSettingsProps {
  question: IField;
}

const QuestionDateSettings = ({ question }: QuestionDateSettingsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 items-start gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`${question.id}-required`}
            defaultChecked={question.required}
          />
          <Label htmlFor={`${question.id}-required`}>Required</Label>
        </div>

        <div className="grid gap-3">
          <Label htmlFor={`${question.id}-type`}>Date format</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue
                id={`${question.id}-date-format`}
                placeholder="Date format"
              />
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
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <Label htmlFor={`${question.id}-placeholder`}>Placeholder</Label>
          <Input id={`${question.id}-placeholder`} />
        </div>

        <div className="grid gap-3">
          <Label htmlFor={`${question.id}-default-value`}>Default value</Label>
          <Input id={`${question.id}-default-value`} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id={`${question.id}-before-date`} />
            <Label htmlFor={`${question.id}-before-date`}>Before date</Label>
          </div>
          <DatePicker id={`${question.id}-before-date-value`} />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id={`${question.id}-after-date`} />
            <Label htmlFor={`${question.id}-after-date`}>After date</Label>
          </div>
          <DatePicker id={`${question.id}-after-date-value`} />
        </div>
      </div>
    </>
  );
};

export default QuestionDateSettings;
