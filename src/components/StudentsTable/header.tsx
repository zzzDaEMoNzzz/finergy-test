import { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

export const StudentsTableHeader = memo(() => {
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ minWidth: 70 }}>#</TableCell>
        <TableCell style={{ minWidth: 160 }}>Фамилия</TableCell>
        <TableCell style={{ minWidth: 160 }}>Имя</TableCell>
        <TableCell style={{ minWidth: 200 }}>Год рождения</TableCell>
        <TableCell style={{ minWidth: 160 }}>IDNP</TableCell>
        <TableCell style={{ minWidth: 100 }}>Статус</TableCell>
        <TableCell style={{ minWidth: 100 }} />
      </TableRow>
    </TableHead>
  );
});

StudentsTableHeader.displayName = 'StudentsTableHeader';
