import { memo } from 'react';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Student, StudentStatus, StudentStatuses } from '@/types/student';
import { useAppSelector } from '@/store/hooks';
import { selectStudentsPage, selectStudentsPageSize } from '@/store/students/slice';

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

type Props = {
  index: number;
  student: Student;
};

export const StudentsTableBodyRow = memo<Props>(({ index, student }) => {
  const page = useAppSelector(selectStudentsPage);
  const perPage = useAppSelector(selectStudentsPageSize);

  return (
    <StyledTableRow className={student.status === StudentStatuses.Expelled ? 'expelled' : ''}>
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
  );
});

const StyledTableRow = styled(TableRow)`
  &.expelled {
    background: ${red[50]};
  }
`;

StudentsTableBodyRow.displayName = 'StudentsTableBodyRow';
