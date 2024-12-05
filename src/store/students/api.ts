import { GetStudentsParams } from '@/store/students/types';

export const searchStudents = async (params: GetStudentsParams) => {
  try {
    const res = await fetch('/api/students/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: params.page,
        perPage: params.perPage,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        filters: params.filters,
      }),
    });
    return res.json();
  } catch (err) {
    console.error('fetchStudents error:', err);
    return { data: [] };
  }
};
