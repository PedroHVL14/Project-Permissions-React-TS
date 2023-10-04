import { Button, createTheme, styled } from "@mui/material";

export const StyledNavButton = styled(Button)(() => ({
  width: '150px',
  height: '40px',
  marginTop: "15px",
  backgroundColor: '#41b441',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#32CD32',
  },
}));

export const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5'
    }
  }
});