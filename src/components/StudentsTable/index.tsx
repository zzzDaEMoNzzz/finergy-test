'use client';

import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { useAppDispatch } from '@/store/hooks';
import { getStudents } from '@/store/students/slice';

import { StudentsTableHeader } from './header';
import { StudentsTableBody } from './body';
import { StudentsTablePagination } from './pagination';

export const StudentsTable = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <Paper elevation={4}>
      <TableContainer>
        <Table>
          <StudentsTableHeader />
          <StudentsTableBody />
        </Table>
      </TableContainer>
      <StudentsTablePagination />
    </Paper>
  );
};
