'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import type { DateRange, Matcher } from 'react-day-picker';

import { Button } from '@repo/core-ui/components/button';
import { Calendar } from '@repo/core-ui/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/core-ui/components/popover';

import { dateFnsFormat } from '@repo/core-ui/lib/day';

interface DatePickerProps {
  id: string;
  placeholder?: string;
  defaultValue?: Date | Date[] | DateRange;
  disabled?: Matcher | Matcher[] | undefined;
  mode?: 'single' | 'multiple' | 'range';
  dateFormat?: string;
  onChange?: (
    value: number | number[] | { from?: number; to?: number } | undefined
  ) => void;
}

const DatePicker = ({
  id,
  placeholder = 'Select date',
  defaultValue,
  disabled,
  mode = 'single',
  dateFormat,
  onChange,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<Date | Date[] | DateRange | undefined>(
    () => {
      if (!defaultValue) return undefined;
      return defaultValue;
    }
  );

  const formatDate = (date: Date) => {
    if (!dateFormat) return date.toLocaleDateString();

    try {
      return dateFnsFormat(date, dateFormat);
    } catch {
      return date.toLocaleDateString();
    }
  };

  const getDisplayText = () => {
    switch (mode) {
      case 'single':
        return value && !Array.isArray(value) && !('from' in value)
          ? formatDate(value as Date)
          : placeholder;
      case 'multiple': {
        const dates = Array.isArray(value) ? value : [];
        if (dates.length === 0) return placeholder;
        if (dates.length === 1) return formatDate(dates[0] as Date);
        return `${dates.length} dates selected`;
      }
      case 'range': {
        const range =
          value && typeof value === 'object' && 'from' in value
            ? (value as DateRange)
            : undefined;
        if (!range?.from) return placeholder;
        if (!range.to) return formatDate(range.from);
        return `${formatDate(range.from)} - ${formatDate(range.to)}`;
      }
      default:
        return value && !Array.isArray(value) && !('from' in value)
          ? formatDate(value as Date)
          : placeholder;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          className="w-full justify-between font-normal"
        >
          {getDisplayText()}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        {mode === 'single' && (
          <Calendar
            mode="single"
            selected={
              value && !Array.isArray(value) && !('from' in value)
                ? (value as Date)
                : undefined
            }
            disabled={disabled}
            captionLayout="dropdown"
            onSelect={(selected) => {
              setValue(selected);
              onChange?.(selected ? selected.getTime() : undefined);
              setOpen(false);
            }}
          />
        )}
        {mode === 'multiple' && (
          <Calendar
            mode="multiple"
            selected={Array.isArray(value) ? value : []}
            disabled={disabled}
            captionLayout="dropdown"
            onSelect={(selected) => {
              const dates = selected || [];
              setValue(dates);
              onChange?.(dates.map((date) => date.getTime()));
              setOpen(false);
            }}
          />
        )}
        {mode === 'range' && (
          <Calendar
            mode="range"
            selected={
              value && typeof value === 'object' && 'from' in value
                ? (value as DateRange)
                : undefined
            }
            disabled={disabled}
            captionLayout="dropdown"
            onSelect={(selected) => {
              setValue(selected);
              onChange?.(
                selected
                  ? {
                      from: selected.from?.getTime(),
                      to: selected.to?.getTime(),
                    }
                  : undefined
              );
              setOpen(false);
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
