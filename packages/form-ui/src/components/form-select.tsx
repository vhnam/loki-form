'use client';

import { useId } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { selectFieldAttributesSchema } from '@repo/form-ui/schemas/select';
import { type ISelectAttributes } from '@repo/form-ui/schemas/select';

import { getFieldAttributes } from '@repo/form-ui/utils/field';

import { Label } from '@repo/core-ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

const FormSelect = (field: IField) => {
  const id = field.id ?? useId();
  const attributes = getFieldAttributes<ISelectAttributes>(
    selectFieldAttributesSchema,
    field
  );

  if (!attributes) {
    return null;
  }

  const { placeholder, defaultValue, options } = attributes.data;

  return (
    <div className="grid w-full items-center gap-2">
      <Label className="text-sm font-medium" htmlFor={id}>
        {field.label}
      </Label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue id={id} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
