import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sidebar } from "../App/Sidebar";
import { ContentContainer, GeralContainer } from "../Profile/styles";
import { Header } from "../App/Header";
import { CenteredH2, NewStyledDiv, PrimaryButtonStyled } from "./styles";
import { StyledDiv } from "../Signup/styles";
import { CustomTextField } from '../../components/CustomTextField';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../validations/authContext';
import { api } from '../../lib/axios/axios';
import { ModalContainer, Overlay, SpaceBet, SpaceTop } from '../groups/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type FormValues = {
    name: string;
    email: string;
    password: string;
};

export default function EmployeesPage() {
    const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
    const { user } = useAuth();
    const [userGroups, setUserGroups] = useState<any[]>([]);
    const { register, handleSubmit, control } = useForm<FormValues>();

    const handleNewEmployeeClick = () => {
        setEmployeeModalOpen(true);
    };

    const handleCloseModal = () => {
        setEmployeeModalOpen(false);
    };

    useEffect(() => {
        if (user?.id) {
            api.get(`/user-groups/${user.id}`)
                .then(response => setUserGroups(response.data))
                .catch(error => console.error('Erro ao buscar grupos:', error));
        }
    }, [user?.id]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nome', width: 150 },
        { field: 'description', headerName: 'descrição', width: 350 }
    ];

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <NewStyledDiv>
                            <CenteredH2>Funcionários</CenteredH2>
                            <PrimaryButtonStyled onClick={handleNewEmployeeClick}>
                                Novo Funcionário
                            </PrimaryButtonStyled>
                        </NewStyledDiv>
                    </StyledDiv>
                </GeralContainer>

                {isEmployeeModalOpen && (
                    <Overlay>
                        <ModalContainer>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <StyledDiv style={{ marginTop: "-15px" }}>
                                    <CustomTextField {...register("name")} label="Nome" />
                                    <CustomTextField {...register("email")} label="Email" />
                                    <StyledDiv style={{ marginTop: "15px" }}>
                                        <PasswordInput control={control} name="password" />
                                    </StyledDiv>
                                </StyledDiv>
                                <div style={{ height: 300, width: '100%', marginTop: "20px", marginBottom: "-20px" }}>
                                    <DataGrid
                                        rows={userGroups}
                                        columns={columns} />
                                </div>
                                <StyledDiv>
                                    <SpaceTop>
                                        <SpaceBet>
                                            <PrimaryButtonStyled onClick={handleCloseModal}>
                                                Fechar
                                            </PrimaryButtonStyled>
                                        </SpaceBet>
                                        <SpaceBet>
                                            <PrimaryButtonStyled type="submit">
                                                Salvar
                                            </PrimaryButtonStyled>
                                        </SpaceBet>
                                    </SpaceTop>
                                </StyledDiv>
                            </form>
                        </ModalContainer>
                    </Overlay>
                )}
            </ContentContainer>
        </div>
    );
}
