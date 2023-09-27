import { Container } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { NavButton } from '../../components/NavButton';
import { BoxStyled, TitleText } from './styles';
import { StyledDiv } from '../Signup/styles';

export function Home() {
  return (
    <Container >
      <BoxStyled>
        <StyledDiv>
          <TitleText>
            Bem-vindo
          </TitleText>
        </StyledDiv>
        <StyledDiv>
          <NavButton label="Cadastro" icon={<ArrowForward />} path="/signup" />
        </StyledDiv>
        <StyledDiv>
          <NavButton label="Login" icon={<ArrowForward />} path="/login" variant="outlined" />
        </StyledDiv>
      </BoxStyled>
    </Container>
  );
}
