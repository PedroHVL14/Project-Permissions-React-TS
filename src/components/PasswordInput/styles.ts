import { TextField, styled } from "@mui/material";

export const StyledOutlinedInput = styled(TextField)(() => ({
  width: '300px',
  height: '50px',
  display: 'block',
  alignItems: 'center',
  justifyContent: 'center',
  
  '& label': {
    color: 'green', // Cor padrão do rótulo
  },
  '& label.Mui-focused': {
    color: 'green', // Cor do rótulo quando focado
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'green', // Cor da borda em estado normal
    },
    '&:hover fieldset': {
      borderColor: 'darkgreen', // Cor da borda ao passar o mouse
    },
    '&.Mui-focused fieldset': {
      borderColor: 'limegreen', // Cor da borda quando focado
    },
  },
  '& .MuiInputBase-input': {
    color: 'green', // Cor do texto do input
  }
}));
