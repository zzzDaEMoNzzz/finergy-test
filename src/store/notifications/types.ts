import { OverridableStringUnion } from '@mui/types';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert/Alert';

export type NotificationState = {
  id: string;
  description: string;
  severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
};

export type NotificationsSlice = {
  notifications: NotificationState[];
};
