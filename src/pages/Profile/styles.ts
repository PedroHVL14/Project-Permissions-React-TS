import styled from '@mui/styled-engine';
import Button from '@mui/material/Button';
import { StyledButton } from '../App/Sidebar/styles';
import { theme } from '../../components/NavButton/styles';
import { NavButton } from '../../components/NavButton';

export const globalFontStyle = {
    fontFamily: "'Open Sans', sans-serif"
};

export const Sidebar = styled('div')({
    display: 'flex',
    padding: '10px',
    flexDirection: 'column',
    gap: '10px',
    width: '280px',
    height: '80vh',
    position: 'absolute',
    top: '80px',
    left: '10px',
    margin: 0,
    borderRight: '1px solid #e0e0e0',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
});

export const SidebarButton = styled(Button)({
    backgroundColor: 'transparent',
    color: '#696969',
    textTransform: 'none',
    justifyContent: 'start',
    padding: 0,
    borderRadius: '8px',
    width: '270px',
    height: '45px',
    '&:hover': {
        backgroundColor: '#EBF3E7',
        color: '#41b441',
    }
});

export const ProfileStyledButton = styled(StyledButton)({
    width: 'auto',
});

export const StyledDivText = styled('div')({
    ...globalFontStyle
});

export const SidebarIcon = styled('span')({
    marginRight: '8px',
    display: 'inline-flex',
    alignItems: 'center',
});


export const NavButtonStyled = styled(NavButton)({
    marginTop: '20px'
});