import { Container, Typography, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { NavButton } from '../../components/NavButton';

export function Home() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Bem-vindo
        </Typography>
        <NavButton label="Cadastro" icon={<ArrowForward />} path="/signup" />
        <NavButton label="Login" icon={<ArrowForward /> } path="/login" variant="outlined"/>
      </Box>
    </Container>
  );
}
