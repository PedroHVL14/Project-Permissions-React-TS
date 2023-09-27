import { useState } from "react";
import { Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../../components/CustomTextField";
import { PrimaryButton } from "../../components/PrimaryButton";
import { api } from "../../lib/axios/axios";
import { BoxStyled, Container } from "./styles";
import { StyledDiv } from "../Signup/styles";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        api.post('login', { email, password })
            .then(() => {
                localStorage.setItem('loggedInEmail', email);
                console.log("E-mail logado:", email);
                navigate('/App');
            })
            .catch(({ response }) => {
                alert(response.data.message);
            })
    };

    return (
        <Container>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <BoxStyled>
                <CustomTextField
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <CustomTextField
                    label="Senha"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <StyledDiv>
                    <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
                </StyledDiv>
            </BoxStyled>
        </Container>
    );
}
