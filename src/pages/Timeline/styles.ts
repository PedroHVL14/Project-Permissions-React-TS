import { Card, Theme, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  padding: '20px',
  marginLeft: '20px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    marginLeft: '-20px',
    marginBottom: '20px',
  },
}));

export const ChartContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '800px',
  height: '400px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '20px',
    width: '300px',
    height: '300px',
  },
}));
