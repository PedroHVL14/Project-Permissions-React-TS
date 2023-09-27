import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { isValidEmail } from "../../../validations/isValidEmail";
import { useState } from "react";
import { StyledDiv } from "../styles";

export type UserProps = {
    userName: string;
    email: string;
    password: string;
    phone: string;
}

interface UserFormProps {
    userData: UserProps;
    handleUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

const isUserDataValid = (userData: UserProps): string => {
    if (!userData.userName || !userData.email || !userData.password || !userData.phone) {
        return "Todos os campos são obrigatórios!";
    }
    if (!isValidEmail(userData.email)) {
        return "Por favor, insira um e-mail válido.";
    }
    return "";
}

export function UserForm({
    userData,
    handleUserChange,
    handleSubmit
}: UserFormProps) {
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormSubmit = () => {
        const validationMessage = isUserDataValid(userData);
        if (validationMessage) {
            setErrorMessage(validationMessage);
        } else {
            handleSubmit();
        }
    }

    return (
        <>
            <Box component="form" mt={3} width="100%">
                <StyledDiv>
                    <CustomTextField
                        label="Nome do usuário"
                        name="userName"
                        value={userData.userName}
                        onChange={handleUserChange} />
                </StyledDiv>
                <StyledDiv>
                    <CustomTextField
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleUserChange} />
                </StyledDiv>
                <StyledDiv>
                    <CustomTextField
                        label="Senha"
                        name="password"
                        value={userData.password}
                        onChange={handleUserChange} />
                </StyledDiv>
                <StyledDiv>
                    <CustomTextField
                        label="Celular"
                        name="phone"
                        value={userData.phone}
                        onChange={handleUserChange} />
                </StyledDiv>
                <StyledDiv>{errorMessage && <Typography color="error">{errorMessage}</Typography>}</StyledDiv>
                <StyledDiv>
                    <PrimaryButton onClick={handleFormSubmit}>Cadastrar</PrimaryButton>
                </StyledDiv>
            </Box>
        </>
    );
}
