import { Step, StepLabel, Stepper } from '@mui/material';

interface SignupStepperProps {
  activeStep: number;
}

export function SignupStepper(props: SignupStepperProps) {
  const { activeStep } = props;
  const steps = ['EMPRESA', 'USUÁRIO'];

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label} disabled={true}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default SignupStepper;
