import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../components/CustomTextField";
import { PrimaryButton } from "../components/PrimaryButton";

type LoginProps = {
    email: string;
    password: string;
}

type UserDetailsProps = {
    email: string;
    password: string;
}

export function Login() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);

    const [loginData, setLoginData] = useState<LoginProps>({
        email: "",
        password: ""
    });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.status === 200) {
                const data = await response.json();
                setUserDetails(data);
                localStorage.setItem('loggedInEmail', loginData.email);
                console.log("E-mail logado:", loginData.email);
                navigate('/FirstPage');

            }
            else {
                alert("Erro no login. Verifique seu e-mail e senha.");
            }
        } catch (error) {
            alert("Erro ao tentar fazer login. Tente novamente mais tarde.");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" mt={3} width="100%">
                <CustomTextField
                    label="Email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange} />

                <CustomTextField
                    label="Senha"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange} />
                
                <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
            </Box>
        </Box>
    );
}
