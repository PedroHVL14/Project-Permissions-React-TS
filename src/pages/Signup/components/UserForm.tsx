import { Box } from "@mui/material";
import { Control, Controller } from 'react-hook-form';
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { isValidEmail } from "../../../validations/isValidEmail";
import { StyledDiv } from "../styles";
import { ErrorMessage } from "../../../components/errorMessage";
import { SignupProps } from "..";

export type UserProps = {
    userName: string;
    email: string;
    password: string;
    phone: string;
}

interface UserFormProps {
    handleSubmit: () => void;
    control: Control<SignupProps, any>
}

export function UserForm({
    handleSubmit,
    control
}: UserFormProps) {

    return (
        <>
            <Box component="form" mt={3} width="100%">
                <StyledDiv>
                    <Controller
                        control={control}
                        name='user.userName'
                        rules={{ required: "Nome do usuário é obrigatório" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    label="Nome do usuário"
                                    error={!!error?.message}
                                    onChange={onChange}
                                    value={value} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                </StyledDiv>

                <StyledDiv>
                    <Controller
                        control={control}
                        name='user.email'
                        rules={{ required: "Email é obrigatório", validate: value => isValidEmail(value) || "Por favor, insira um e-mail válido." }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    label="Email"
                                    error={!!error?.message}
                                    onChange={onChange}
                                    value={value} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                </StyledDiv>

                <StyledDiv>
                    <Controller
                        control={control}
                        name='user.password'
                        rules={{ required: "Senha é obrigatória" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    label="Senha"
                                    error={!!error?.message}
                                    onChange={onChange}
                                    value={value} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                </StyledDiv>

                <StyledDiv>
                    <Controller
                        control={control}
                        name='user.phone'
                        rules={{ required: "Celular é obrigatório" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    label="Celular"
                                    error={!!error?.message}
                                    onChange={onChange}
                                    value={value} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                </StyledDiv>
                <StyledDiv>
                    <PrimaryButton onClick={handleSubmit}>Cadastrar</PrimaryButton>
                </StyledDiv>
            </Box>
        </>
    );
}
