import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import SignupStepper from './components/Stepper';
import { UserForm, UserProps } from './components/UserForm';
import { api } from '../../lib/axios/axios';
import { CompanyForm, CompanyProps } from './components/CompanyForm';

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

    const handleSubmit = async () => {
        try {
            const companyResponse = await api.post('/signup/company', companyData);
            const completeUserData = {
                ...userData,
                company_id: companyResponse.data.id
            };
            const userResponse = await api.post('/signup/user', completeUserData);
            if (userResponse.status === 201) {
                navigate("/login");
            } else {
                handleSubmissionError();
            }
        } catch (error) {
            handleSubmissionError();
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <SignupStepper activeStep={step - 1} />
            </Box>

            {step === 1 && (
                <CompanyForm
                    companyData={companyData}
                    handleCompanyChange={handleCompanyChange}
                    handleSubmit={() => setStep(2)} />
            )}
            {step === 2 && (
                <UserForm
                    userData={userData}
                    handleUserChange={handleUserChange}
                    handleSubmit={handleSubmit} />
            )}
        </Box>
    );
}
