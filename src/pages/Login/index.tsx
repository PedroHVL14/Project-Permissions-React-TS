import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../../components/CustomTextField";
import { PrimaryButton } from "../../components/PrimaryButton";
import { api } from "../../lib/axios/axios";
import { BoxStyled, Container } from "./styles";
import { StyledDiv } from "../Signup/styles";
import { TitleText } from "../Home/styles";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "../../components/errorMessage";

interface IFormInput {
    email: string;
    password: string;
}

export function Login() {
    const navigate = useNavigate();

    const formMethods = useForm<IFormInput>();

    const handleLogin = async (data: IFormInput) => {
        api.post('login', data)
            .then(() => {
                localStorage.setItem('loggedInEmail', data.email);
                console.log("E-mail logado:", data.email);
                navigate('/App');
            })
    };

    return (
        <FormProvider {...formMethods}>
            <Container>
                <TitleText>
                    Login
                </TitleText>
                <BoxStyled>
                    <Controller
                        name='email'
                        rules={{ required: "Email é obrigatório" }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    {...field}
                                    label="Email"
                                    error={!!error} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                    <Controller
                        name='password'
                        rules={{ required: "Senha é obrigatória" }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    {...field}
                                    label="Senha"
                                    error={!!error} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                    <StyledDiv>
                        <PrimaryButton onClick={formMethods.handleSubmit(handleLogin)}>Login</PrimaryButton>
                    </StyledDiv>
                </BoxStyled>
            </Container>
        </FormProvider>
    );
}
