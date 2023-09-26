import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { UserProps } from "../SignupTypes";

interface UserFormProps {
    userData: UserProps;
    handleUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage: string;
    handleSubmit: () => void;
}

export function UserForm({
    userData,
    handleUserChange,
    errorMessage,
    handleSubmit
}: UserFormProps) {

    return (
        <>
            <Typography component="h1" variant="h5">
                Cadastro - Usuário Admin
            </Typography>
            <Box component="form" mt={3} width="100%">
                <CustomTextField
                    label="Nome do usuário"
                    name="email"
                    value={userData.email}
                    onChange={handleUserChange} />

                <CustomTextField
                    label="Email"
                    name="userName"
                    value={userData.userName}
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

                {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                <PrimaryButton onClick={handleSubmit}>Cadastrar</PrimaryButton>

            </Box>
        </>
    );
}
