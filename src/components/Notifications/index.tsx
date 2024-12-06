'use client';

import { memo } from 'react';
import { styled } from '@mui/material/styles';

import { useAppSelector } from '@/store/hooks';
import { selectNotifications } from '@/store/notifications/slice';

import { Notification } from './notification';

export const Notifications = memo(() => {
  const notifications = useAppSelector(selectNotifications);

  return (
    <NotificationsContainer>
      {notifications.map((state) => (
        <Notification key={state.id} {...state} />
      ))}
    </NotificationsContainer>
  );
});

Notifications.displayName = 'Notifications';

const NotificationsContainer = styled('div')`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  .MuiAlert-root {
    min-width: 240px;
  }
`;
