import { IconButton, styled } from "@mui/material";

export const HeaderContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    padding: '0 20px',
    width: 'calc(100% - 280px)',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: 'white',
});

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
