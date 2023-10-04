import { TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(() => ({
  width: '300px',
  display: 'block',
  alignItems: 'center',
  justifyContent: 'center',
  '& label.Mui-focused': {
    color: 'green', 
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'gray', 
    },
    '&:hover fieldset': {
      borderColor: 'darkgreen',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'limegreen',
    },
  },
  '& .MuiInputBase-input': {
    color: 'black',
  }
}));
