import { Avatar, styled, Theme } from "@mui/material";
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

export const globalFontStyle = {
    fontFamily: "'Open Sans', sans-serif"
};

export const StyledDivText = styled('div')({
    ...globalFontStyle
});

export const GeralContainer = styled('div')(({ theme }: { theme: Theme }) => ({
    marginTop: '20px',
    backgroundColor: 'white',
    width: 'calc(100% - 20px)',
    marginLeft: "10px",
    overflow: 'auto',
    borderRadius: '30px',
    [theme.breakpoints.down('sm')]: {
        marginTop: '50px',
        width: '100%'
    },
}));

export const ContentContainer = styled('div')(() => ({
    flexGrow: 1,
    width: 'calc(100% - 280px)',
    display: 'flex',
    flexDirection: 'column',
}));

export const NewStyledDiv = styled('div')(() => ({
    alignItems: "center",
    marginBottom: "20px",
    marginTop: "20px"
}));

export const CenteredText = styled('p')(() => ({
    textAlign: 'center',
}));

export const AvatarContainer = styled('div')({
    position: 'relative',
    display: 'inline-block',
    '&:hover': {
        '& .styled-avatar': {
            filter: 'brightness(0.5)'
        },
        '& .camera-wrapper': {
            visibility: 'visible'
        }
    }
});

export const StyledAvatar = styled(Avatar)(() => ({
    transition: 'filter 0.3s',
    '&:hover': {
        filter: 'brightness(2)'
    }
}));

export const CameraIcon = styled(CameraEnhanceIcon)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '5rem',
    borderRadius: '100%',
    padding: '10px', 
    color: "white"
});

export const CameraIconWrapper = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    visibility: 'hidden',
    marginTop: "-10px",
    '&:hover': {
        visibility: 'visible'
    }
});

export const CameraIconText = styled('span')({
    color: 'white',
    fontSize: '0.9rem',
    marginTop: '80px',
    textAlign: 'center'
});