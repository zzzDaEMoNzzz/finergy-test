import { Student } from '@/types/student';
import { StudentsSlice, StudentsSorting } from '@/store/students/types';
import { createAppSlice } from '@/store/createAppSlice';
import { searchStudents } from '@/store/students/api';
import { getPayloadFilters } from '@/store/students/utilts';

const initialState: StudentsSlice = {
  items: [],
  isLoading: false,
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
    updateStudent: creators.reducer<Student>((state, action) => {
      state.items = state.items.map((student) => {
        if (student.id === action.payload.id) {
          return action.payload;
        }
        return student;
      });
    }),
    setStudentsPage: creators.reducer<number>((state, action) => {
      state.page = action.payload;
    }),
    setStudentsPageSize: creators.reducer<number>((state, action) => {
      state.perPage = action.payload;
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

export const { getStudents, updateStudent, setStudentsPage, setStudentsPageSize } =
  studentsSlice.actions;

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
