import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);

    const [loginData, setLoginData] = useState({
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
                body: JSON.stringify(loginData)  // Use the actual loginData for the request body
            });


            if (response.status === 200) {
                const data = await response.json();
                setUserDetails(data);
                // Save user's email to localStorage

                // Save user's email to localStorage
                localStorage.setItem('loggedInEmail', loginData.email);
                console.log("E-mail logado:", loginData.email);  // Logging the logged-in email
                navigate('/userDetails');

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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    label="Senha"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                />
                <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
