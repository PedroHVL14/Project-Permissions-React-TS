import { IconButton, styled } from "@mui/material";

export const HeaderContainer = styled('div')<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    padding: '0 20px',
    width: fullWidth ? '100%' : 'calc(100% - 280px)',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
        height: '50px',
    },
}));

export const ScreenName = styled('span')({
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#41b441',
});

export const RightContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const StyledAvatarButton = styled(IconButton)({
    color: '#696969',
    '& .MuiSvgIcon-root': {
        fontSize: '32px',
    }
});

export const LeftContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
});

