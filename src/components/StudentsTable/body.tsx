import { memo } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppSelector } from '@/store/hooks';
import { selectStudents, selectStudentsIsLoading } from '@/store/students/slice';

import { StudentsTableBodyRow } from './row';

export const StudentsTableBody = memo(() => {
  const students = useAppSelector(selectStudents);
  const isLoading = useAppSelector(selectStudentsIsLoading);

  return (
    <TableBody>
      {isLoading || !students.length ? (
        <TableRow>
          <TableCell colSpan={7}>
            <Box display="flex" alignItems="center" justifyContent="center" height={80}>
              <CircularProgress size={64} />
            </Box>
          </TableCell>
        </TableRow>
      ) : (
        <>
          {students.map((student, index) => (
            <StudentsTableBodyRow key={student.id} index={index} student={student} />
          ))}
        </>
      )}
    </TableBody>
  );
});

StudentsTableBody.displayName = 'StudentsTableBody';
