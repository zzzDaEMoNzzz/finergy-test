import { memo } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppSelector } from '@/store/hooks';
import { selectStudents, selectStudentsIsLoading } from '@/store/students/slice';

import { StudentsTableBodyRow } from './row';
import Typography from '@mui/material/Typography';

export const StudentsTableBody = memo(() => {
  const students = useAppSelector(selectStudents);
  const isLoading = useAppSelector(selectStudentsIsLoading);

  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={7}>
            <Box display="flex" alignItems="center" justifyContent="center" height={80}>
              <CircularProgress size={64} />
            </Box>
          </TableCell>
        </TableRow>
      ) : students.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7}>
            <Typography variant="subtitle1" component="span">
              Нет данных
            </Typography>
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
