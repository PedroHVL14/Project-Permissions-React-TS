import { CssBaseline, ThemeProvider } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { NavButton } from '../../components/NavButton';
import { BoxStyled, ContainerStyled, DividerStyled, ImageStyled, TextContainer } from './styles';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { ErrorMessage } from '../../components/errorMessage';
import { api } from '../../lib/axios/axios';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../components/CustomTextField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { theme } from '../../components/NavButton/styles';
import { StyledDiv } from '../Signup/styles';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../validations/authContext';

interface IFormInput {
  email: string;
  password: string;
}

export function Home() {
  const navigate = useNavigate();
  const formMethods = useForm<IFormInput>();
  const { login } = useAuth();
  const handleLogin = async (data: IFormInput) => {
    api.post('login', data).then((response) => {
      const userDetails = response.data.userDetails;
      login(userDetails);
        const userId = response.data.userId;
        localStorage.setItem('loggedInUserId', userId.toString());
        console.log("Id logado:", userId);

        api.post('login-history', { user_id: userId })
          .then(() => {
            console.log("Registro de login inserido no histórico.");
          })
          .catch((error) => {
            console.error("Erro ao inserir registro de login no histórico:", error);
          });
  
        navigate('/');
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
          <ImageStyled src="https://i.ibb.co/h87QwkF/image-removebg-preview.png" alt="Imagem do Gerenciador de Funcionários" />
        </TextContainer>
      </ContainerStyled>
    </ThemeProvider>
  );
}
