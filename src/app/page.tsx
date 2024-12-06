import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { StudentsTable } from '@/components/StudentsTable';
import { StudentsFilters } from '@/components/StudentsFilters';
import { StudentsToolbar } from '@/components/StudentsToolbar';

export default function Home() {
  return (
    <Container component="main">
      <Box paddingY={4} paddingX={2}>
        <StudentsToolbar />
        <StudentsFilters />
        <StudentsTable />
      </Box>
    </Container>
  );
}
