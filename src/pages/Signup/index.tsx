import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm, UserProps } from './components/UserForm';
import { CompanyForm, CompanyProps } from './components/CompanyForm';
import SignupStepper from './components/Stepper';
import { StyledBox, StyledDiv } from './styles';
import { StyledSteper } from './components/Stepper/styles';
import { useForm, FormProvider } from 'react-hook-form'; // Import FormProvider
import { api } from '../../lib/axios/axios';

export type SignupProps = {
    company: CompanyProps;
    user: UserProps;
}

export function Signup() {
    const [step, setStep] = useState(1);  
    const methods = useForm<SignupProps>(); // Use the useForm hook
    const navigate = useNavigate();

    function onSave(props: SignupProps) {
        api.post('/signup/company', props.company)
            .then(companyResponse => {
                const companyId = companyResponse.data.id;
                const userData = {
                    ...props.user,
                    company_id: companyId
                };
                return api.post('/signup/user', userData);
            })
            .then(userResponse => {
                console.log("User registered successfully:", userResponse.data.message);
                navigate('/login');
            })
            .catch(error => {
                console.error("Error during registration:", error.response?.data?.message || error.message);
            });
    }

    return (
        <FormProvider {...methods}> {/* Use the FormProvider here */}
            <StyledBox>
                <StyledDiv>
                    <StyledSteper>
                        <SignupStepper activeStep={step - 1} />
                    </StyledSteper>
                    <StyledDiv>
                        {step === 1 && (
                            <CompanyForm
                                handleSubmit={() => setStep(2)}
                                control={methods.control}
                            />
                        )}
                    </StyledDiv>
                    <StyledDiv>
                        {step === 2 && (
                            <UserForm
                                handleSubmit={methods.handleSubmit(onSave)}
                                control={methods.control}
                            />
                        )}
                    </StyledDiv>
                </StyledDiv>
            </StyledBox>
        </FormProvider>
    );
}
