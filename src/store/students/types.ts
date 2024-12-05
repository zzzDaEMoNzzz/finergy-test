import { Student } from '@/types/student';

export type StudentsPagination = {
  page: number;
  perPage: number;
};

export type StudentsSorting = {
  sortBy: keyof Student | null;
  sortOrder: 'asc' | 'desc' | null;
};

export type StudentsFilters = {
  lastName: string;
  firstName: string;
  idnp: string;
  dateBirthFrom: Date | null;
  dateBirthTo: Date | null;
};

export type StudentsSlice = StudentsPagination &
  StudentsSorting & {
    items: Student[];
    isLoading: boolean;
    filters: StudentsFilters;
  };

export type GetStudentsParams = Partial<
  StudentsPagination & StudentsSorting & { filters: Partial<StudentsFilters> }
>;
