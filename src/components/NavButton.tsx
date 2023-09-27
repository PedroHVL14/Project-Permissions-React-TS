import { Box, Button } from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  label: string;
  icon: ReactElement;
  path: string;
  variant?: 'contained' | 'outlined';
}

export function NavButton({ label, icon, path, variant = 'contained' }: NavButtonProps){ 
  const navigate = useNavigate(); 

  return (
    <Box mt={2}>
      <Button
        variant={variant}
        color="primary"
        endIcon={icon}
        onClick={() => {
          navigate(path);
        }}>
        {label}
      </Button>
    </Box>
  );
};
