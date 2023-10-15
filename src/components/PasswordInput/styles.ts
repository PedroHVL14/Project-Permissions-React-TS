import { TextField, styled } from "@mui/material";

export const StyledOutlinedInput = styled(TextField)(() => ({
  width: '300px',
  height: '50px',
  display: 'block',
  alignItems: 'center',
  justifyContent: 'center',
  
  '& label': {
    color: 'green',
  },
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'green',
    },
    '&:hover fieldset': {
      borderColor: 'darkgreen',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'limegreen',
    },
  },
  '& .MuiInputBase-input': {
    color: 'green',
  }
}));
