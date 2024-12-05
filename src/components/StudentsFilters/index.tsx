'use client';

import { memo } from 'react';
import Box from '@mui/material/Box';

import { StudentsTextFilter } from './textFilter';
import { StudentsDateFilter } from './dateFilter';

export const StudentsFilters = memo(() => {
  return (
    <Box display="flex" gap={2} marginBottom={2}>
      <StudentsTextFilter label="Фамилия" field="lastName" />
      <StudentsTextFilter label="Имя" field="firstName" />
      <StudentsTextFilter label="IDNP" field="idnp" />
      <StudentsDateFilter label="Дата рождения от" field="dateBirthFrom" />
      <StudentsDateFilter label="Дата рождения до" field="dateBirthTo" />
    </Box>
  );
});

StudentsFilters.displayName = 'StudentsFilters';
