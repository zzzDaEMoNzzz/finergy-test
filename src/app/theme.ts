'use client';

import { createTheme } from '@mui/material/styles';
import { ruRU as coreLocale } from '@mui/material/locale';
import { ruRU as datePickersLocale } from '@mui/x-date-pickers/locales';

export const theme = createTheme(
  {
    typography: {
      fontFamily: 'var(--font-roboto)',
    },
  },
  coreLocale,
  datePickersLocale,
);
