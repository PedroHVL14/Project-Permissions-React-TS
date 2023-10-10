import { Stack } from "@mui/material";
import { Sidebar } from "../App/Sidebar";
import { ContentContainer, GeralContainer } from "../Profile/styles";
import { Header } from "../App/Header";
import { StyledDiv } from "../Signup/styles";
import { useForm } from "react-hook-form";
import { PrimaryButtonStyled } from "./styles";

export default function EmployeesPage() {
    const {handleSubmit} = useForm<{
        name: string;
        password: string;
        currentPassword: string;
        phone: string;
    }>();
    const handleUpdateSettings = (data: any) => {
        console.log(data);
    };
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <h2>Funcionários</h2>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <PrimaryButtonStyled
                            onClick={handleSubmit(handleUpdateSettings)}>
                            Novo Funcionário
                        </PrimaryButtonStyled>
                        </Stack>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}
