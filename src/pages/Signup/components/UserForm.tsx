import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { isValidEmail } from "../../../validations/isValidEmail";
import { useState } from "react";

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
            <Typography component="h1" variant="h5">
                Cadastro - Usuário Admin
            </Typography>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Box component="form" mt={3} width="100%">
                <CustomTextField
                    label="Nome do usuário"
                    name="userName"
                    value={userData.userName}
                    onChange={handleUserChange} />

                <CustomTextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserChange} />

                <CustomTextField
                    label="Senha"
                    name="password"
                    value={userData.password}
                    onChange={handleUserChange} />

                <CustomTextField
                    label="Celular"
                    name="phone"
                    value={userData.phone}
                    onChange={handleUserChange} />

                <PrimaryButton onClick={handleFormSubmit}>Cadastrar</PrimaryButton>
            </Box>
        </>
    );
}
