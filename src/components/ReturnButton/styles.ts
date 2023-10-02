import { styled } from '@mui/material';
import Button from '@mui/material/Button';

export const ReturnButtonStyled = styled(Button)(() => ({
    position: 'absolute',
    top: '10px',
    left: '10px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    minWidth: 'auto',
    padding: 0 
}));
