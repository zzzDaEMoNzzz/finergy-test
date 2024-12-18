import { Student } from '@/types/student';
import { createAppSlice } from '@/store/createAppSlice';

import { StudentsFilters, StudentsSlice, StudentsSorting } from './types';
import { searchStudents, updateStudent as updateStudentRequest } from './api';
import { getPayloadFilters } from './utils';

const initialState: StudentsSlice = {
  items: [],
  isLoading: true,
  total: 0,
  page: 0,
  perPage: 10,
  filters: {
    lastName: '',
    firstName: '',
    idnp: '',
    dateBirthFrom: null,
    dateBirthTo: null,
  },
  sortBy: null,
  sortOrder: null,
};

export const studentsSlice = createAppSlice({
  name: 'students',
  initialState,
  reducers: (creators) => ({
    getStudents: creators.asyncThunk(
      async (_: void, thunkAPI) => {
        const state = thunkAPI.getState() as { students: StudentsSlice };
        const studentsState = state.students;
        return searchStudents({
          page: studentsState.page,
          perPage: studentsState.perPage,
          sortBy: studentsState.sortBy,
          sortOrder: studentsState.sortOrder,
          filters: getPayloadFilters(studentsState.filters),
        });
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.items = action.payload.students;
          const { filters, page, perPage, sortBy, sortOrder, total } = action.payload.meta;
          if (typeof filters === 'object') {
            state.filters = filters;
          }
          if (typeof page === 'number') {
            state.page = page;
          }
          if (typeof perPage === 'number') {
            state.perPage = perPage;
          }
          if (typeof total === 'number') {
            state.total = total;
          }
          if (typeof sortBy === 'string') {
            state.sortBy = sortBy as keyof Student;
          }
          if (typeof sortOrder === 'string') {
            state.sortOrder = sortOrder as StudentsSorting['sortOrder'];
          }
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    updateStudent: creators.asyncThunk(
      (student: Student) => {
        return updateStudentRequest(student.id, student);
      },
      {
        fulfilled: (state, action) => {
          const updatedStudent = action.payload?.student as Student;
          if (updatedStudent) {
            state.items = state.items.map((student) => {
              if (student.id === updatedStudent.id) {
                return updatedStudent;
              }
              return student;
            });
          }
        },
      },
    ),
    setStudentsPage: creators.reducer<number>((state, action) => {
      state.page = action.payload;
    }),
    setStudentsPageSize: creators.reducer<number>((state, action) => {
      state.perPage = action.payload;
    }),
    setStudentsSortField: creators.reducer<StudentsSlice['sortBy']>((state, action) => {
      state.sortBy = action.payload;
    }),
    setStudentsSortOrder: creators.reducer<StudentsSlice['sortOrder']>((state, action) => {
      state.sortOrder = action.payload;
    }),
    setStudentsFilters: creators.reducer<Partial<StudentsFilters>>((state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    }),
  }),
  selectors: {
    selectStudents: (state) => state.items,
    selectStudentsIsLoading: (state) => state.isLoading,
    selectStudentsTotal: (state) => state.total,
    selectStudentsPage: (state) => state.page,
    selectStudentsPageSize: (state) => state.perPage,
    selectStudentsSortField: (state) => state.sortBy,
    selectStudentsSortOrder: (state) => state.sortOrder,
    selectStudentsFilters: (state) => state.filters,
  },
});

export const {
  getStudents,
  updateStudent,
  setStudentsPage,
  setStudentsPageSize,
  setStudentsSortField,
  setStudentsSortOrder,
  setStudentsFilters,
} = studentsSlice.actions;

export const {
  selectStudents,
  selectStudentsIsLoading,
  selectStudentsTotal,
  selectStudentsPage,
  selectStudentsPageSize,
  selectStudentsSortField,
  selectStudentsSortOrder,
  selectStudentsFilters,
} = studentsSlice.selectors;
