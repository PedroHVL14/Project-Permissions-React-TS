import { Button, styled } from "@mui/material";

export const StyledPrimaryButton = styled(Button)(() => ({
  width: '150px',
  height: '40px',
  marginTop: "15px",
  backgroundColor: '#41b441',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#32CD32',
  },
}));

