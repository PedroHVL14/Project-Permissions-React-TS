import React, { useEffect, useState } from 'react';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { ContentContainer, GeralContainer } from '../Profile/styles';
import { CenteredH2, NewStyledDiv, PrimaryButtonStyled } from '../employees/styles';
import { StyledDiv } from '../Signup/styles';
import { CustomTextField } from '../../components/CustomTextField';
import { ModalContainer, Overlay, SpaceBet, SpaceBotton, SpaceTop } from './styles';
import { EnhancedTransferList } from './components/EnhancedTransferList';
import { useAuth } from '../../validations/authContext';
import { api } from '../../lib/axios/axios';
import { useGroup } from './groupContext';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Groups: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { user } = useAuth();
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [userGroups, setUserGroups] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    // @ts-ignore
    const { group, setGroup } = useGroup();

    const confirmDelete = () => {
        if (selectedRows.length > 0) {
            handleDeleteSelected();
        }
        setShowDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const saveGroup = async () => {
        try {
            const permissions = {
                DashboardPermission: selectedPermissions.includes('Dashboard'),
                ClientesPermission: selectedPermissions.includes('Clientes'),
                ProdutosPermission: selectedPermissions.includes('Produtos'),
                VendasPermission: selectedPermissions.includes('Vendas'),
                MarketingPermission: selectedPermissions.includes('Marketing'),
                LojaPermission: selectedPermissions.includes('Loja'),
                IntegraçõesPermission: selectedPermissions.includes('Integrações'),
                name: groupName,
                description: groupDescription
            };

            const response = await api.post('/groups', {
                permissions,
                userId: user?.id
            });

            if (response.status === 201) {
                alert('Grupo criado com sucesso!');
                setGroup(permissions);
                window.location.reload();
                setModalOpen(false);
            } else {
                alert('Ocorreu um erro ao criar o grupo.');
            }
        } catch (error) {
            console.error('Erro ao criar grupo:', error);
            alert('Ocorreu um erro ao criar o grupo. Por favor, tente novamente mais tarde.');
        }
    };
    useEffect(() => {
        if (user?.id) {
            api.get(`/user-groups/${user.id}`)
                .then(response => setUserGroups(response.data))
                .catch(error => console.error('Erro ao buscar grupos:', error));
        }
    }, [user?.id]);

    const handleEdit = (rowData: any) => {
        console.log("Editando grupo:", rowData);
    };

    const handleDeleteSelected = async () => {
        try {
            for (const groupId of selectedRows) {
                await api.delete(`/groups/${groupId}`);
            }
            alert('Selected groups deleted successfully!');
            window.location.reload();
            const updatedGroups = userGroups.filter(group => !selectedRows.includes(group.id.toString()));
            setUserGroups(updatedGroups);
            setSelectedRows([]);
        } catch (error) {
            console.error('Error deleting selected groups:', error);
            alert('Error deleting selected groups. Please try again.');
        }
    };

    const handleRowClick = (param: any) => {
        console.log(param.row);
    };

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
                <IconButton onClick={() => setShowDeleteConfirmation(true)} disabled={selectedRows.length === 0}>
                    <DeleteIcon />
                </IconButton>
            </GridToolbarContainer>
        );
    };

    const columns: GridColDef[] = [
        {
            field: 'edit',
            headerName: 'Editar',
            width: 100,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        },
        { field: 'name', headerName: 'Nome', width: 200 },
        { field: 'description', headerName: 'Descrição', width: 400 }
    ];

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Grupos" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <NewStyledDiv>
                            <CenteredH2>Grupos</CenteredH2>
                            <PrimaryButtonStyled onClick={() => setModalOpen(true)}>
                                Novo Grupo
                            </PrimaryButtonStyled>
                        </NewStyledDiv>
                        <div style={{ height: 400, width: '90%', marginTop: "20px", marginBottom: "20px" }}>
                            <DataGrid
                                rows={userGroups}
                                columns={columns}
                                checkboxSelection
                                onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection as string[])}
                                onRowClick={handleRowClick}
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                            />
                        </div>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>

            {isModalOpen && (
                <Overlay>
                    <ModalContainer>
                        <StyledDiv>
                            <SpaceBotton>
                                <CustomTextField label="Nome" value={groupName} onChange={e => setGroupName(e.target.value)} />
                                <CustomTextField label="Descrição" value={groupDescription} onChange={e => setGroupDescription(e.target.value)} />
                            </SpaceBotton>
                            <EnhancedTransferList onPermissionsChange={setSelectedPermissions} />
                            <SpaceTop>
                                <SpaceBet>
                                    <PrimaryButtonStyled onClick={() => setModalOpen(false)}>
                                        Fechar
                                    </PrimaryButtonStyled>
                                </SpaceBet>
                                <SpaceBet>
                                    <PrimaryButtonStyled onClick={saveGroup}>
                                        Salvar
                                    </PrimaryButtonStyled>
                                </SpaceBet>
                            </SpaceTop>
                        </StyledDiv>
                    </ModalContainer>
                </Overlay>
            )}

            {showDeleteConfirmation && (
                <Overlay>
                    <ModalContainer>
                        <StyledDiv>
                            <SpaceBotton>
                                Tem certeza que deseja apagar?
                            </SpaceBotton>
                            <SpaceTop>
                                <SpaceBet>
                                    <PrimaryButtonStyled onClick={cancelDelete}>
                                        Voltar
                                    </PrimaryButtonStyled>
                                </SpaceBet>
                                <SpaceBet>
                                    <PrimaryButtonStyled onClick={confirmDelete}>
                                        Apagar
                                    </PrimaryButtonStyled>
                                </SpaceBet>
                            </SpaceTop>
                        </StyledDiv>
                    </ModalContainer>
                </Overlay>
            )}
        </div>
    );
}
