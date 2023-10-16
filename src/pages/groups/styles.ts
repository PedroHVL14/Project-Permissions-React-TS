import styled from "@emotion/styled";
import { Paper, Button as MuiButton, Grid as MuiGrid } from "@mui/material";

export const Overlay = styled("div")(() => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center", 
    alignItems: "center", 
    zIndex: 1000,
    overflowY: 'auto',
    padding: '2%'
}));

export const ModalContainer = styled(Paper)(() => ({
    padding: "20px",
    maxWidth: "600px",
    width: "100%",
    maxHeight: '105%',
    overflowY: 'auto',
    zIndex: 1001,
    position: "relative",
    borderRadius: "40px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
}));

export const CustomList = styled(Paper)(() => ({
    width: 200,
    height: 230,
    overflow: 'auto'
}));

export const TransferGrid = styled(MuiGrid)(() => ({
    justifyContent: "center",
    alignItems: "center"
}));

export const MoveButton = styled(MuiButton)(() => ({
    marginTop: "10px"
}));

export const ListContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 200
}));

export const ListTitle = styled('div')(() => ({
    marginBottom: 10,
}));

export const SpaceBotton = styled('div')(() => ({
    marginBottom: "20px",
}));

export const SpaceTop = styled('div')(() => ({
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start"
}));

export const SpaceBet = styled('div')(() => ({
    marginLeft: "10px",
    marginRight: "10px",
    display: "flex"

}));
