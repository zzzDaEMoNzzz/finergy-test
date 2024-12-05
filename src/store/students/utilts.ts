/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentsFilters } from '@/store/students/types';

export const getPayloadFilters = (filters: StudentsFilters) => {
  const result: Partial<StudentsFilters> = {};
  Object.keys(filters).forEach((key) => {
    const value = filters[key as keyof StudentsFilters];
    if (value instanceof Date) {
      result[key as keyof StudentsFilters] = value.toString() as any;
    } else if (value) {
      result[key as keyof StudentsFilters] = value as any;
    }
  });
  return result;
};
