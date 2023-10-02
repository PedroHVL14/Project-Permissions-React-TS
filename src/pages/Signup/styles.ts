import {Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center"
  }));

  export const StyledDiv = styled('div')(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px"
}));

export const SpecialStyledDiv = styled(StyledDiv)`
    margin-top: 25px;
`;

