import { memo, useCallback, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import { NotificationState } from '@/store/notifications/types';
import { useAppDispatch } from '@/store/hooks';
import { closeNotification } from '@/store/notifications/slice';
import { wait } from '@/utils/wait';

export const Notification = memo<NotificationState>((props) => {
  const { id, severity, description } = props;

  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const autoClose = async () => {
      await wait(4500);
      setVisible(false);
      await wait(500);
      dispatch(closeNotification(id));
    };
    autoClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    dispatch(closeNotification(id));
  }, [dispatch, id]);

  return (
    <Slide direction="down" in={visible}>
      <Alert severity={severity} variant="filled" onClose={onClose}>
        {description}
      </Alert>
    </Slide>
  );
});

Notification.displayName = 'Notification';
