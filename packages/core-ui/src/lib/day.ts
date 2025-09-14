import { format as dateFnsFormat } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

export type AllowedLocales = 'en-US' | 'vi-VN';

export type SupportedFormatStrings = 'MM/dd/yyyy' | 'dd/MM/yyyy';

export const formatStrings: Record<
  AllowedLocales,
  Record<string, SupportedFormatStrings>
> = {
  ['en-US']: {
    default: 'MM/dd/yyyy',
  },
  ['vi-VN']: {
    default: 'dd/MM/yyyy',
  },
};

export const format = (
  date: Date,
  formatString: SupportedFormatStrings,
  locale: AllowedLocales
): string => {
  return dateFnsFormat(date, formatString, {
    locale: locale === 'en-US' ? enUS : vi,
  });
};
