import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm, UserProps } from './components/UserForm';
import { CompanyForm, CompanyProps } from './components/CompanyForm';
import SignupStepper from './components/Stepper';
import { StyledBox, StyledDiv } from './styles';
import { useForm, FormProvider } from 'react-hook-form';
import { api } from '../../lib/axios/axios';
import { ReturnButton } from '../../components/ReturnButton';
import { Stack } from '@mui/material';

export type SignupProps = {
    company: CompanyProps;
    user: UserProps;
}

export function Signup() {
    const [step, setStep] = useState(1);
    const methods = useForm<SignupProps>();
    const navigate = useNavigate();

    function onSave(props: SignupProps) {
        api.post('/signup', props)
            .then(response => {
                console.log("Company and user registered successfully:", response.data.message);
                navigate('/');
            })
            .catch(error => {
                console.error("Error during registration:", error.response?.data?.message || error.message);
            });
    }

    return (
        <FormProvider {...methods}>
            <StyledBox>
                <div style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                    <ReturnButton returnRoute={'/'} />
                </div>
                <StyledDiv>
                    <SignupStepper activeStep={step - 1} onClick={setStep} />
                    <StyledDiv>
                        <Stack display={step != 1 ? 'none' : undefined}>
                            <CompanyForm
                                handleSubmit={() => setStep(2)}
                                control={methods.control}
                            />
                        </Stack>
                    </StyledDiv>
                    <StyledDiv>
                        <Stack display={step != 2 ? 'none' : undefined}>
                            <UserForm
                                handleSubmit={methods.handleSubmit(onSave)}
                                control={methods.control}
                            />
                        </Stack>
                    </StyledDiv>
                </StyledDiv>
            </StyledBox>
        </FormProvider>
    );
}
