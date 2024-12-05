'use client';

import { memo } from 'react';
import Box from '@mui/material/Box';

import { StudentsTextFilter } from './textFilter';
import { StudentsDateFilter } from './dateFilter';
import { useAppSelector } from '@/store/hooks';
import { selectStudentsFilters } from '@/store/students/slice';

export const StudentsFilters = memo(() => {
  const { dateBirthFrom, dateBirthTo } = useAppSelector(selectStudentsFilters);

  return (
    <Box display="flex" gap={2} marginBottom={2}>
      <StudentsTextFilter label="Фамилия" field="lastName" />
      <StudentsTextFilter label="Имя" field="firstName" />
      <StudentsTextFilter label="IDNP" field="idnp" />
      <StudentsDateFilter label="Дата рождения от" field="dateBirthFrom" max={dateBirthTo} />
      <StudentsDateFilter label="Дата рождения до" field="dateBirthTo" min={dateBirthFrom} />
    </Box>
  );
});

StudentsFilters.displayName = 'StudentsFilters';
