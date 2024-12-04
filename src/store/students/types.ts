import { Student } from '@/types/student';

export type StudentsPagination = {
  page: number;
  perPage: number;
};

export type StudentsSorting = {
  sortBy: keyof Student | null;
  sortOrder: 'asc' | 'desc' | null;
};

export type StudentsFiltering = {
  filters: Record<string, string>;
};

export type StudentsSlice = StudentsPagination &
  StudentsSorting &
  StudentsFiltering & {
    items: Student[];
    isLoading: boolean;
  };
