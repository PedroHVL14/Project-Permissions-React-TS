import styled from "@emotion/styled";
import { StyledPrimaryButton } from "../../components/PrimaryButton/styles";

export const PrimaryButtonStyled = styled(StyledPrimaryButton)(() => ({
  width: '175px',
  height: '50px',
}));

export const NewStyledDiv = styled('div')(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: '100%',
  marginRight: "50px"
}));

export const CenteredH2 = styled('h2')(() => ({
  margin: '0 auto 0 0',
  marginLeft: "40px"
}));
