import { CssBaseline, ThemeProvider } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { NavButton } from '../../components/NavButton';
import { BigText, BoxStyled, ContainerStyled, DividerStyled, SmallText, TextContainer } from './styles';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { ErrorMessage } from '../../components/errorMessage';
import { api } from '../../lib/axios/axios';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../components/CustomTextField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { theme } from '../../components/NavButton/styles';
import { StyledDiv } from '../Signup/styles';
import { PasswordInput } from '../../components/PasswordInput';

interface IFormInput {
  email: string;
  password: string;
}

export function Home() {
  const navigate = useNavigate();
  const formMethods = useForm<IFormInput>();

  const handleLogin = async (data: IFormInput) => {
    api.post('login', data)
      .then(() => {
        localStorage.setItem('loggedInEmail', data.email);
        console.log("E-mail logado:", data.email);
        navigate('/App');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContainerStyled>
        <BoxStyled>
          <FormProvider {...formMethods}>
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
            <StyledDiv>
            <PasswordInput 
                control={formMethods.control}
                name="password"
                rules={{ required: "Senha é obrigatória" }}
            />
            </StyledDiv>
            <ErrorMessage message={formMethods.formState.errors.password?.message} />
            <PrimaryButton onClick={formMethods.handleSubmit(handleLogin)}>Login</PrimaryButton>
            <DividerStyled />
            <NavButton label="Cadastro" icon={<ArrowForward />} path="/signup" />
          </FormProvider>
        </BoxStyled>
        <TextContainer>
            <BigText>
              Gerenciador de Funcionários
            </BigText>
            <SmallText>
              plug4sales
            </SmallText>
        </TextContainer>
      </ContainerStyled>
    </ThemeProvider>
  );
}
