import { Step, StepLabel, Stepper } from '@mui/material';

interface SignupStepperProps {
  activeStep: number;
  onClick: (step: number) => void;
}

export function SignupStepper(props: SignupStepperProps) {
  const { activeStep, onClick } = props;
  const steps = ['EMPRESA', 'USUÁRIO'];

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label} disabled={true} onClick={() => onClick(index + 1)}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default SignupStepper;
