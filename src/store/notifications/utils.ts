import { generateId } from '@/utils/generateId';

import { NotificationState } from './types';

export const createNewNotification = (
  notification: Omit<NotificationState, 'id' | 'visible'>,
): NotificationState => ({
  id: generateId(),
  ...notification,
});
