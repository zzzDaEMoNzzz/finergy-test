'use client';

import { memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Print from '@mui/icons-material/Print';

import { useModalState } from '@/hooks/useModalState';
import { AddStudentModal } from '@/components/AddStudentModal';

import { ToolbarButton } from './button';

export const StudentsToolbar = memo(() => {
  const addStudentModal = useModalState();

  const printHandler = useCallback(() => {
    window.print();
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h2" component="h1" gutterBottom>
        Студенты
      </Typography>
      <Box display="flex" gap={1} className="no-print">
        <ToolbarButton tooltip="Печать" onClick={printHandler}>
          <Print />
        </ToolbarButton>
        <ToolbarButton tooltip="Добавить нового студента" onClick={addStudentModal.show}>
          <PersonAdd />
        </ToolbarButton>
      </Box>
      <AddStudentModal open={addStudentModal.isVisible} onClose={addStudentModal.hide} />
    </Box>
  );
});

StudentsToolbar.displayName = 'StudentsToolbar';
