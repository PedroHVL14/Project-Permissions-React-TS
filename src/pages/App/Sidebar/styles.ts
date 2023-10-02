import { Button, styled } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const SidebarContainer = styled('div')({
    backgroundColor: 'white',
    width: '280px',
    height: '100vh',
    padding: '20px',
    margin: 0,
    borderRight: '1px solid #e0e0e0', 
});

export const LogoImage = styled('img')({
    width: '100%',
    marginBottom: '5px',
});

export const MenuList = styled('ul')({
    listStyleType: 'none',
    padding: 0,
});

export const MenuItem = styled('li')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    cursor: 'pointer',
});

export const StyledButton = styled(Button)({
    backgroundColor: 'transparent',
    color: '#696969',
    textTransform: 'none',
    justifyContent: 'start',
    padding: 0,
    borderRadius: '8px',
    width: '500px',
    height: '45px',
    '&:hover': {
        backgroundColor: '#EBF3E7',
        color: '#41b441',}
});

export const StyledArrowIcon = styled(KeyboardDoubleArrowRightIcon)({
    position: 'absolute',
    right: '5px',
    top: '50%', 
    transform: 'translateY(-50%)'
});

export const IconWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
});