import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

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
        <Box mt={5}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForward />}
            onClick={() => {
              navigate('/signup');
            }}
          >
            Cadastro
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<ArrowForward />}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
