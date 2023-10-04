import { styled } from '@mui/material';
import Button from '@mui/material/Button';

export const ReturnButtonStyled = styled(Button)(() => ({
    top: '-5px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    minWidth: 'auto',
    padding: 0,
    backgroundColor: '#41b441',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#32CD32',
    },
}));
