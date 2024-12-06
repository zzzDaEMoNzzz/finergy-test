import { Student } from '@/types/student';
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

export const updateStudent = async (id: string, payload: Partial<Student>) => {
  try {
    const res = await fetch(`/api/students/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (err) {
    console.error('updateStudent error:', err);
    return null;
  }
};

export const addStudent = async (payload: Omit<Student, 'id' | 'status'>) => {
  try {
    const res = await fetch(`/api/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (err) {
    console.error('addStudent error:', err);
    return null;
  }
};
