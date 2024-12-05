import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { StudentStatus, StudentStatuses } from '@/types/student';
import { useAppSelector } from '@/store/hooks';
import {
  selectStudents,
  selectStudentsIsLoading,
  selectStudentsPage,
  selectStudentsPageSize,
} from '@/store/students/slice';

import { StudentsTableActions } from './actions';

const renderStatus = (status: StudentStatus) => {
  switch (status) {
    case StudentStatuses.Studies:
      return 'Учится';
    case StudentStatuses.Expelled:
      return 'Исключен';
    default:
      return null;
  }
};

export const StudentsTableBody = memo(() => {
  const students = useAppSelector(selectStudents);
  const isLoading = useAppSelector(selectStudentsIsLoading);
  const page = useAppSelector(selectStudentsPage);
  const perPage = useAppSelector(selectStudentsPageSize);

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
            <StyledTableRow
              key={student.id}
              className={student.status === StudentStatuses.Expelled ? 'expelled' : ''}
            >
              <TableCell>{page * perPage + index + 1}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{new Date(student.dateBirth).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell>{student.idnp}</TableCell>
              <TableCell>{renderStatus(student.status)}</TableCell>
              <TableCell>
                <StudentsTableActions student={student} />
              </TableCell>
            </StyledTableRow>
          ))}
        </>
      )}
    </TableBody>
  );
});

const StyledTableRow = styled(TableRow)`
  &.expelled {
    background: ${red[50]};
  }
`;

StudentsTableBody.displayName = 'StudentsTableBody';
