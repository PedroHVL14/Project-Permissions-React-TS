import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledNavButton } from './styles';

interface NavButtonProps {
  label: string;
  icon: ReactElement;
  path: string;
  variant?: 'contained' | 'outlined';
}

export function NavButton({ label, icon, path, variant = 'contained', className, onClick }: NavButtonProps & { className?: string, onClick?: () => void }) { 
  const navigate = useNavigate(); 

  const handleClick = () => {
      if (onClick) onClick();
      navigate(path);
  };

  return (
      <Box className={className}>
          <StyledNavButton
              variant={variant}
              color="primary"
              endIcon={icon}
              onClick={handleClick}>
              {label}
          </StyledNavButton>
      </Box>
  );
};
