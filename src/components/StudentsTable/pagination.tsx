import { ChangeEvent, memo, useCallback } from 'react';
import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getStudents,
  selectStudentsPage,
  selectStudentsPageSize,
  selectStudentsTotal,
  setStudentsPage,
  setStudentsPageSize,
} from '@/store/students/slice';

import { getPaginationDisplayedRowsLabel } from './utils';

export const StudentsTablePagination = memo(() => {
  const dispatch = useAppDispatch();

  const total = useAppSelector(selectStudentsTotal);
  const page = useAppSelector(selectStudentsPage);
  const perPage = useAppSelector(selectStudentsPageSize);

  const handleChangePage = useCallback(
    (_: unknown, page: number) => {
      dispatch(setStudentsPage(page));
      dispatch(getStudents());
    },
    [dispatch],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const pageSize = parseInt(event.target.value, 10);
      dispatch(setStudentsPageSize(pageSize));
      dispatch(setStudentsPage(0));
      dispatch(getStudents());
    },
    [dispatch],
  );

  return (
    <TablePagination
      component="div"
      labelRowsPerPage="Студентов на странице"
      labelDisplayedRows={getPaginationDisplayedRowsLabel}
      rowsPerPageOptions={[10, 25, 50, 100]}
      colSpan={3}
      count={total}
      page={page}
      rowsPerPage={perPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      slotProps={{
        select: {
          inputProps: {
            'aria-label': 'Студентов на странице',
          },
        },
      }}
      className="no-print"
    />
  );
});

StudentsTablePagination.displayName = 'StudentsTablePagination';
