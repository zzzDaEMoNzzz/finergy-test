'use client';

import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';

import { useModalState } from '@/hooks/useModalState';
import { AddStudentModal } from '@/components/AddStudentModal';

import { ToolbarButton } from './button';

export const StudentsToolbar = memo(() => {
  const addStudentModal = useModalState();
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h2" component="h1" gutterBottom>
        Студенты
      </Typography>
      <Box display="flex" gap={2}>
        <ToolbarButton tooltip="Добавить студента" onClick={addStudentModal.show}>
          <PersonAdd />
        </ToolbarButton>
      </Box>
      <AddStudentModal open={addStudentModal.isVisible} onClose={addStudentModal.hide} />
    </Box>
  );
});

StudentsToolbar.displayName = 'StudentsToolbar';
