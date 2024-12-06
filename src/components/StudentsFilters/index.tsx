'use client';

import { memo } from 'react';
import Grid from '@mui/material/Grid2';

import { useAppSelector } from '@/store/hooks';
import { selectStudentsFilters } from '@/store/students/slice';
import { IDNPValidator } from '@/utils/validators';

import { StudentsTextFilter } from './textFilter';
import { StudentsDateFilter } from './dateFilter';

export const StudentsFilters = memo(() => {
  const { dateBirthFrom, dateBirthTo } = useAppSelector(selectStudentsFilters);

  return (
    <Grid container spacing={2} marginBottom={2} className="no-print">
      <Grid container spacing={2} size={{ xs: 12, lg: 7 }}>
        <Grid size={4}>
          <StudentsTextFilter label="Фамилия" field="lastName" />
        </Grid>
        <Grid size={4}>
          <StudentsTextFilter label="Имя" field="firstName" />
        </Grid>
        <Grid size={4}>
          <StudentsTextFilter
            label="IDNP"
            field="idnp"
            validator={IDNPValidator}
            errorText="Должен содержать 13 цифр"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} size={{ xs: 12, lg: 5 }}>
        <Grid size={6}>
          <StudentsDateFilter label="Дата рождения от" field="dateBirthFrom" max={dateBirthTo} />
        </Grid>
        <Grid size={6}>
          <StudentsDateFilter label="Дата рождения до" field="dateBirthTo" min={dateBirthFrom} />
        </Grid>
      </Grid>
    </Grid>
  );
});

StudentsFilters.displayName = 'StudentsFilters';
