import { memo, useCallback } from 'react';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';

import { Student, StudentStatuses } from '@/types/student';
import { useAppDispatch } from '@/store/hooks';
import { updateStudent } from '@/store/students/slice';

type Props = {
  student: Student;
};

export const StudentsTableActions = memo<Props>(({ student }) => {
  const dispatch = useAppDispatch();

  const toggleStatus = useCallback(() => {
    const newStatus =
      student.status === StudentStatuses.Expelled
        ? StudentStatuses.Studies
        : StudentStatuses.Expelled;
    dispatch(
      updateStudent({
        ...student,
        status: newStatus,
      }),
    );
  }, [dispatch, student]);

  const Icon = student.status === StudentStatuses.Expelled ? AddCircleOutlined : RemoveCircle;

  return (
    <Button
      startIcon={<Icon />}
      onClick={toggleStatus}
      color={student.status === StudentStatuses.Expelled ? 'primary' : 'error'}
      variant="contained"
      size="small"
    >
      {student.status === StudentStatuses.Expelled ? 'Включить в группу' : 'Удалить из группы'}
    </Button>
  );
});

StudentsTableActions.displayName = 'StudentsTableActions';
