import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { Typography } from '@mui/material';
import { EnhancedTransferList } from '../groups/components/EnhancedTransferList';
import { isValidEmail } from '../../validations/isValidEmail';
import { ErrorMessage } from '../../components/errorMessage';

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
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

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
        if (!selectedGroup && selectedPermissions.length === 0) {
            alert("Por favor, selecione um grupo ou adicione permissões!");
            return;
        }
        console.log(data);
    };

    const handlePermissionsChange = (permissions: string[]) => {
        setSelectedGroup(null);
        setSelectedPermissions(permissions);
    };
    const handleGroupSelection = (rowSelectionModel: any[]) => {
        const selectedId = rowSelectionModel[0];
        setSelectedGroup(selectedId);
        setSelectedPermissions([]);
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
                                <Typography variant="h5" align="center" marginTop={"10px"}>
                                    Adicionar Usuário
                                </Typography>
                                    <CustomTextField {...register("name")} label="Nome" />
                                    <Controller
                                        control={control}
                                        name='email'
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
                                    <StyledDiv style={{ marginTop: "15px" }}>
                                        <PasswordInput control={control} name="password" />
                                    </StyledDiv>
                                </StyledDiv>
                                <div style={{ height: 300, width: '100%', marginTop: "20px", marginBottom: "20px" }}>
                                    <DataGrid
                                        rows={userGroups}
                                        columns={columns}
                                        onRowSelectionModelChange={handleGroupSelection}
                                        rowSelectionModel={selectedGroup ? [selectedGroup] : []}
                                    />
                                </div>

                                <Typography variant="h6" align="center" marginTop={"20px"} marginBottom={"20px"}>
                                    ou
                                </Typography>
                                <EnhancedTransferList onPermissionsChange={handlePermissionsChange} />
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
