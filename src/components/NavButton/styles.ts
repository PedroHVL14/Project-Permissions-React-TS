import { Button, createTheme, styled } from "@mui/material";

export const StyledNavButton = styled(Button)(() => ({
  marginTop: '10px',
  width: '150px',
  height: '40px',
  display: 'flex',
  justifyContent: "space-between",
  backgroundColor: '#32CD32',
  '&:hover': {
    backgroundColor: '#45a049',
  }
}));

export const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5'
    }
  }
});