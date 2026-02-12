import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ****************************************************************************
// IDs

// 8-character alphanumeric non-unique ID
export function eightCharId() {
  return Math.random().toString(36).slice(2, 10);
}
