import { memo, useCallback, useState } from 'react';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { Student, StudentStatuses } from '@/types/student';
import { useAppDispatch } from '@/store/hooks';
import { updateStudent } from '@/store/students/slice';
import { showNotification } from '@/store/notifications/slice';

type Props = {
  student: Student;
};

export const StudentsTableActions = memo<Props>(({ student }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const toggleStatus = useCallback(async () => {
    setIsLoading(true);
    const res = await dispatch(
      updateStudent({
        ...student,
        status:
          student.status === StudentStatuses.Expelled
            ? StudentStatuses.Studies
            : StudentStatuses.Expelled,
      }),
    );
    dispatch(
      showNotification({
        severity: 'success',
        description:
          res.payload.student.status === StudentStatuses.Expelled
            ? 'Студент удален из группы'
            : 'Студент добавлен в группу',
      }),
    );
    setIsLoading(false);
  }, [dispatch, student]);

  const Icon = student.status === StudentStatuses.Expelled ? AddCircleOutlined : RemoveCircle;

  return (
    <Button
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Icon />}
      onClick={toggleStatus}
      color={student.status === StudentStatuses.Expelled ? 'primary' : 'error'}
      variant="contained"
      size="small"
      className="no-print"
    >
      {student.status === StudentStatuses.Expelled ? 'Включить в группу' : 'Удалить из группы'}
    </Button>
  );
});

StudentsTableActions.displayName = 'StudentsTableActions';
