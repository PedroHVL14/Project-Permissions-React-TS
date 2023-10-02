import { Box, Container, Typography, styled } from "@mui/material";

export const ContainerStyled = styled(Container)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: '100vh'
}));

export const BoxStyled = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    borderRadius: '10px'
}));

export const DividerStyled = styled(Box)(() => ({
    height: '1px',
    width: '100%',
    backgroundColor: '#C0C0C0',
    marginBottom: '5px',
    marginTop: '15px',
    borderRadius: '50px'
}));

export const TextContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "center",
    width: "40%"
}));

export const BigText = styled(Typography)(() => ({
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "end"
}));

export const SmallText = styled(Typography)(() => ({
    fontSize: "20px",
    textAlign: "center",
    marginTop: '-5px'
}));