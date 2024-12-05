import { memo, useCallback } from 'react';
import { TableCellProps } from '@mui/material/TableCell/TableCell';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

import { Student } from '@/types/student';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getStudents,
  selectStudentsSortField,
  selectStudentsSortOrder,
  setStudentsSortField,
  setStudentsSortOrder,
} from '@/store/students/slice';

type CellProps = TableCellProps & {
  field: keyof Student;
};

const TableCellWithSorting = memo<CellProps>((props) => {
  const { field, children } = props;

  const dispatch = useAppDispatch();

  const sortField = useAppSelector(selectStudentsSortField);
  const sortDirection = useAppSelector(selectStudentsSortOrder);

  const changeSorting = useCallback(() => {
    const isAsc = sortField === field && sortDirection === 'asc';
    dispatch(setStudentsSortField(field));
    dispatch(setStudentsSortOrder(isAsc ? 'desc' : 'asc'));
    dispatch(getStudents());
  }, [sortField, field, sortDirection, dispatch]);

  return (
    <TableCell style={{ minWidth: 160 }}>
      <TableSortLabel
        active={sortField === field}
        direction={sortDirection || undefined}
        onClick={changeSorting}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
});

TableCellWithSorting.displayName = 'TableCellWithSort';

export const StudentsTableHeader = memo(() => {
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ minWidth: 70 }}>#</TableCell>
        <TableCellWithSorting style={{ minWidth: 160 }} field="lastName">
          Фамилия
        </TableCellWithSorting>
        <TableCellWithSorting style={{ minWidth: 160 }} field="firstName">
          Имя
        </TableCellWithSorting>
        <TableCellWithSorting style={{ minWidth: 200 }} field="dateBirth">
          Год рождения
        </TableCellWithSorting>
        <TableCellWithSorting style={{ minWidth: 160 }} field="idnp">
          IDNP
        </TableCellWithSorting>
        <TableCell style={{ minWidth: 120 }}>Статус</TableCell>
        <TableCell style={{ minWidth: 180 }} />
      </TableRow>
    </TableHead>
  );
});

StudentsTableHeader.displayName = 'StudentsTableHeader';
