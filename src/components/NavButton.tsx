import { Box, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  label: string;
  icon: ReactElement;
  path: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon, path }) => {
  const navigate = useNavigate(); 

  return (
    <Box mt={2}>
      <Button
        variant="outlined"
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

export default NavButton;
