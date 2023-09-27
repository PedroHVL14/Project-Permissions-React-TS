import { Step, StepLabel, Stepper } from '@mui/material';

interface SignupStepperProps {
  activeStep: number;
}

export function SignupStepper(props: SignupStepperProps) {
  const { activeStep } = props;
  const steps = ['Company Signup', 'User Signup'];

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default SignupStepper;
