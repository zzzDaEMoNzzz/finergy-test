import { createAppSlice } from '@/store/createAppSlice';

import { NotificationState, NotificationsSlice } from './types';
import { createNewNotification } from './utils';

const initialState: NotificationsSlice = {
  notifications: [],
};

export const notificationsSlice = createAppSlice({
  name: 'notifications',
  initialState,
  reducers: (creators) => ({
    showNotification: creators.reducer<Omit<NotificationState, 'id' | 'visible'>>(
      (state, action) => {
        state.notifications.push(createNewNotification(action.payload));
      },
    ),
    closeNotification: creators.reducer<string>((state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    }),
  }),
  selectors: {
    selectNotifications: (state) => state.notifications,
  },
});

export const { showNotification, closeNotification } = notificationsSlice.actions;
export const { selectNotifications } = notificationsSlice.selectors;
