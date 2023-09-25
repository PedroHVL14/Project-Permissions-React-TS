import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validCNPJ } from "./regex/regexCNPJ";

function Signup() {
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [companyData, setCompanyData] = useState({
        companyName: "",
        cnpj: "",
        segment: ""
    });
    const [userData, setUserData] = useState({
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

    const isValidEmail = (email: string) => {
        return /^\S+@\S+\.\S+$/.test(email); 
    };    

    const handleSubmit = async () => {
        setErrorMessage("");
        if (step === 1) {
            if (!companyData.companyName || !companyData.cnpj || !companyData.segment) {
                setErrorMessage("Todos os campos são obrigatórios!");
                return;
            }
            if (!validCNPJ(companyData.cnpj)) {
                alert("CNPJ inválido. Por favor, insira um CNPJ válido.");
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
                    alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
                }
            } catch (error) {
                alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
            }
        } else if (step === 2) {
            if (!isValidEmail(userData.email)) {  // Movido para fora da verificação de campos preenchidos
                setErrorMessage("Por favor, insira um e-mail válido.");
                return;
            }
            if (!userData.userName || !userData.email || !userData.password || !userData.phone) {
                setErrorMessage("Todos os campos são obrigatórios!");
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
                    alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
                }
            } catch (error) {
                alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {step === 1 && (
                <>
                    <Typography component="h1" variant="h5">
                        Cadastro - Empresa
                    </Typography>
                    <Box component="form" mt={3} width="100%">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Nome da empresa"
                            name="companyName"
                            value={companyData.companyName}
                            onChange={handleCompanyChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="CNPJ"
                            name="cnpj"
                            value={companyData.cnpj}
                            onChange={handleCompanyChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Segmento"
                            name="segment"
                            value={companyData.segment}
                            onChange={handleCompanyChange}
                        />
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                            Próximo
                        </Button>
                    </Box>
                </>
            )}
            {step === 2 && (
                <>
                    <Typography component="h1" variant="h5">
                        Cadastro - Usuário Admin
                    </Typography>
                    <Box component="form" mt={3} width="100%">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Nome do usuário"
                            name="userName"
                            value={userData.userName}
                            onChange={handleUserChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleUserChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Senha"
                            name="password"
                            value={userData.password}
                            onChange={handleUserChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Celular"
                            name="phone"
                            value={userData.phone}
                            onChange={handleUserChange}
                        />
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                            Cadastrar
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Signup;
