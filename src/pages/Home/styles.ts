import { Box, Typography, styled } from "@mui/material";

export const BoxStyled = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}));

export const TitleText = styled(Typography)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "40px"
  }));
