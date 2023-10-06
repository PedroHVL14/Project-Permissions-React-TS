import { styled, Theme } from "@mui/material";

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
