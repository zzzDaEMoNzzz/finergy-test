import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { StudentsTable } from '@/components/StudentsTable';
import { StudentsFilters } from '@/components/StudentsFilters';

export default function Home() {
  return (
    <Container component="main">
      <Box paddingY={4} paddingX={2}>
        <Typography variant="h2" component="h1" gutterBottom>
          Студенты
        </Typography>
        <StudentsFilters />
        <StudentsTable />
      </Box>
    </Container>
  );
}
