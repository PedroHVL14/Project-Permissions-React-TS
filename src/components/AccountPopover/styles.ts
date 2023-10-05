import { styled, alpha, IconButton } from "@mui/material";

export const StyledAvatarButton = styled(IconButton)(({ theme }) => ({
  p: 0,
  '&:before': {
    zIndex: 1,
    content: "''",
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'absolute',
    bgcolor: alpha(theme.palette.grey[900], 0.8),
  }
}));

export const PopoverPaperProps = {
  sx: {
    p: 0,
    mt: 1.5,
    ml: 0.75,
    width: 180,
    '& .MuiMenuItem-root': {
      typography: 'body2',
      borderRadius: 0.75,
    },
  }
};
