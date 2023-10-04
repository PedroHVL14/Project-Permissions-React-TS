import { Step, StepLabel, Stepper, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#41b441',
    },
  },
});

interface SignupStepperProps {
  activeStep: number;
  onClick: (step: number) => void;
}

export function SignupStepper(props: SignupStepperProps) {
  const { activeStep, onClick } = props;
  const steps = ['EMPRESA', 'USUÁRIO'];

  return (
    <ThemeProvider theme={theme}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} disabled={true} onClick={() => onClick(index + 1)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </ThemeProvider>
  );
}

export default SignupStepper;
