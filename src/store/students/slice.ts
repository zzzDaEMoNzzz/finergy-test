import { Student } from '@/types/student';
import { StudentsSlice, StudentsSorting } from '@/store/students/types';
import { createAppSlice } from '@/store/createAppSlice';
import { searchStudents } from '@/store/students/api';
import { getPayloadFilters } from '@/store/students/utilts';

const initialState: StudentsSlice = {
  items: [],
  isLoading: false,
  page: 0,
  perPage: 20,
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
    // setStudents: creators.reducer<Student[]>((state, action) => {
    //   state.items = action.payload;
    // }),
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
          const { filters, page, perPage, sortBy, sortOrder } = action.payload.meta;
          if (typeof filters === 'object') {
            state.filters = filters;
          }
          if (typeof page === 'number') {
            state.page = page;
          }
          if (typeof perPage === 'number') {
            state.perPage = perPage;
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
