import { Student } from '@/types/student';
import {
  StudentsFiltering,
  StudentsPagination,
  StudentsSlice,
  StudentsSorting,
} from '@/store/students/types';
import { createAppSlice } from '@/store/createAppSlice';
import { fetchStudents } from '@/store/students/api';

const initialState: StudentsSlice = {
  items: [],
  isLoading: false,
  page: 0,
  perPage: 20,
  filters: {},
  sortBy: null,
  sortOrder: null,
};

export const studentsSlice = createAppSlice({
  name: 'students',
  initialState,
  reducers: (creators) => ({
    // setStudents: creators.reducer<Student[]>((state, action) => {
    //   state.items = action.payload;
    // }),
    getStudents: creators.asyncThunk(
      async (params: Partial<StudentsPagination & StudentsSorting & StudentsFiltering>) => {
        const res = await fetchStudents(params);
        return res.data;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.items = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      },
    ),
    updateStudent: creators.reducer<Student>((state, action) => {
      state.items = state.items.map((student) => {
        if (student.id === action.payload.id) {
          return action.payload;
        }
        return student;
      });
    }),
  }),
  selectors: {
    selectStudents: (state) => state.items,
    selectStudentsIsLoading: (state) => state.isLoading,
    selectStudentsPage: (state) => state.page,
    selectStudentsPageSize: (state) => state.perPage,
    selectStudentsSortField: (state) => state.sortBy,
    selectStudentsSortOrder: (state) => state.sortOrder,
    selectStudentsFilters: (state) => state.filters,
  },
});

export const { getStudents, updateStudent } = studentsSlice.actions;

export const {
  selectStudents,
  selectStudentsIsLoading,
  selectStudentsPage,
  selectStudentsPageSize,
  selectStudentsSortField,
  selectStudentsSortOrder,
  selectStudentsFilters,
} = studentsSlice.selectors;
