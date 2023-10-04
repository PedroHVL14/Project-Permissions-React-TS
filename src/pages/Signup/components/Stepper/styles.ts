import { Step, StepLabel, Stepper, styled } from "@mui/material";

export const StyledStep = styled(Step)(({ }) => ({
    '& .MuiStepIcon-root': {
        color: '#41b441',
    },
    '& .MuiStepIcon-completed': {
        color: '#41b441',
    },
    '& .MuiStepIcon-active': {
        color: '#41b441',
    }
}));


export const StyledStepLabel = styled(StepLabel)(({ }) => ({
  '& .MuiStepLabel-label': {
      color: '#41b441',
  },
  '& .MuiStepLabel-label.MuiStepLabel-completed': {
      color: '#41b441',
  },
  '& .MuiStepLabel-label.MuiStepLabel-active': {
      color: '#41b441',
  }
}));

export const StepperStyled = styled(Stepper)(({ }) => ({
  '& .MuiStepIcon-root': {
      color: '#41b441',
  },
  '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: '#41b441',
  },
  '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: '#41b441',
  },
  '& .MuiStepIcon-text': {
      fill: '#41b441',
  }
}));