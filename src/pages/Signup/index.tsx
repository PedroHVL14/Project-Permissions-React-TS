import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm, UserProps } from './components/UserForm';
import { api } from '../../lib/axios/axios';
import { CompanyForm, CompanyProps } from './components/CompanyForm';
import SignupStepper from './components/Stepper';
import { StyledBox, StyledDiv } from './styles';
import { StyledSteper } from './components/Stepper/styles';

export function Signup() {
    const [step, setStep] = useState(1);
    const [companyData, setCompanyData] = useState<CompanyProps>({
        companyName: "",
        cnpj: "",
        segment: ""
    });
    const [userData, setUserData] = useState<UserProps>({
        userName: "",
        email: "",
        password: "",
        phone: ""
    }); 
    const navigate = useNavigate();
    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyData({
            ...companyData,
            [e.target.name]: e.target.value
        });
    };
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmissionError = () => {
        alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
    }

    const handleSubmit = () => {
        api.post('/signup/company', companyData)
            .then(companyResponse => {
                const completeUserData = {
                    ...userData,
                    company_id: companyResponse?.data?.id
                };
                return api.post('/signup/user', completeUserData);
            })
            .then(userResponse => {
                userResponse?.status === 201 && navigate("/login");
                handleSubmissionError();
            })
            .catch(() => {
                handleSubmissionError();
            });
    };    

    return (
        <StyledBox>
            <StyledDiv>
                <StyledSteper>
                    <SignupStepper activeStep={step - 1} />
                </StyledSteper>

                <StyledDiv>
                    {step === 1 && (
                        <CompanyForm
                            companyData={companyData}
                            handleCompanyChange={handleCompanyChange}
                            handleSubmit={() => setStep(2)} />
                    )}
                </StyledDiv>
                <StyledDiv>
                    {step === 2 && (
                        <UserForm
                            userData={userData}
                            handleUserChange={handleUserChange}
                            handleSubmit={handleSubmit} />
                    )}
                </StyledDiv>
            </StyledDiv>
        </StyledBox>
    );
}
