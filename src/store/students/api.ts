import axios from 'axios';

import { StudentsFiltering, StudentsPagination, StudentsSorting } from '@/store/students/types';

export const fetchStudents = async (
  params: Partial<StudentsPagination & StudentsSorting & StudentsFiltering>,
) => {
  const { page = 0, perPage = 20, sortBy = 'id', sortOrder = 'asc', filters = {} } = params;
  return axios.get('/api/students', {
    params: {
      page,
      perPage,
      sortBy,
      sortOrder,
      filters,
    },
  });
};
