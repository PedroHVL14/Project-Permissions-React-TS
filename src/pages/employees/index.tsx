import { Sidebar } from "../App/Sidebar";
import { ContentContainer, GeralContainer } from "../Profile/styles";
import { Header } from "../App/Header";
import { CenteredH2, NewStyledDiv, PrimaryButtonStyled } from "./styles";
import { StyledDiv } from "../Signup/styles";

export default function EmployeesPage() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <NewStyledDiv>
                            <CenteredH2>Funcionários</CenteredH2>   
                            <PrimaryButtonStyled>
                                Novo Funcionário
                            </PrimaryButtonStyled>
                        </NewStyledDiv>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}