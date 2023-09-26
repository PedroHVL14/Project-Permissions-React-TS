import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyProps, UserProps } from './components/SignupTypes';
import { isCompanyDataValid, isUserDataValid } from './components/handleValidations';
import { CompanyForm } from './components/screens/company';
import { Box } from '@mui/material';
import { UserForm } from './components/screens/users';

export function Signup() {
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
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
    const [companyId, setCompanyId] = useState<number | null>(null);
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
        setErrorMessage("");

        if (step === 1) {
            const companyErrorMsg = isCompanyDataValid(companyData);
            if (companyErrorMsg) {
                setErrorMessage(companyErrorMsg);
                return;
            }
            try {
                const response = await fetch("http://localhost:4000/signup/company", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(companyData)
                });
                if (response.status === 201) {
                    const data = await response.json();
                    setCompanyId(data.id);
                    setStep(2);
                } else {
                    handleSubmissionError();
                }
            } catch (error) {
                handleSubmissionError();
            }
        } else if (step === 2) {
            const userErrorMsg = isUserDataValid(userData);
            if (userErrorMsg) {
                setErrorMessage(userErrorMsg);
                return;
            }
            const completeUserData = {
                ...userData,
                company_id: companyId
            };
            try {
                const response = await fetch("http://localhost:4000/signup/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(completeUserData)
                });
                if (response.status === 201) {
                    navigate("/login");
                } else {
                    handleSubmissionError();
                }
            } catch (error) {
                handleSubmissionError();
            }
        }
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {step === 1 && (
                <CompanyForm
                    companyData={companyData}
                    handleCompanyChange={handleCompanyChange}
                    errorMessage={errorMessage}
                    handleSubmit={handleSubmit}/>
            )}
            {step === 2 && (
                <UserForm
                    userData={userData}
                    handleUserChange={handleUserChange}
                    errorMessage={errorMessage}
                    handleSubmit={handleSubmit}/>
            )}
        </Box>
    );
}