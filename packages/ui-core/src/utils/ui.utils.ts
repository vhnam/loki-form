import { isValidElement, type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const hasReadableText = (node: ReactNode): boolean => {
  if (typeof node === 'string') return node.trim().length > 0;
  if (typeof node === 'number') return true;

  if (Array.isArray(node)) {
    return node.some(hasReadableText);
  }

  if (isValidElement(node)) {
    // Ignore aria-hidden elements (icons)
    if ((node.props as { 'aria-hidden'?: boolean })?.['aria-hidden']) return false;
    return hasReadableText((node.props as { children?: ReactNode })?.children);
  }

  return false;
};
