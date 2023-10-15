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
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

export const Groups: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [isModalOpen, setModalOpen] = useState(false);
    const { user } = useAuth();
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [userGroups, setUserGroups] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
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

        try {
            let response;
            if (editingGroupId) {
                response = await api.put(`/groups/${editingGroupId}`, {
                    permissions,
                    userId: user?.id
                });
            
                if (response.status === 200) {
                    enqueueSnackbar('Grupo atualizado com sucesso!', { variant: 'success', autoHideDuration: 10000 });
                } else {
                    enqueueSnackbar('Ocorreu um erro ao atualizar o grupo.', { variant: 'error', autoHideDuration: 10000 });
                }
            } else {
                response = await api.post('/groups', {
                    permissions,
                    userId: user?.id
                });
            
                if (response.status === 201) {
                    enqueueSnackbar('Grupo criado com sucesso!', { variant: 'success', autoHideDuration: 10000 });
                } else {
                    enqueueSnackbar('Ocorreu um erro ao criar o grupo.', { variant: 'error', autoHideDuration: 10000 });
                }
            }            
            if (response.status === 200 || response.status === 201) {
                setGroup(permissions);
                window.location.reload();
                setModalOpen(false);
                setEditingGroupId(null);
            }
        } catch (error) {
            enqueueSnackbar('Erro ao salvar grupo:', { variant: 'error', autoHideDuration: 10000 });
            alert('Ocorreu um erro ao salvar o grupo. Por favor, tente novamente mais tarde.');
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
        setEditingGroupId(rowData.id);
        setGroupName(rowData.name);
        setGroupDescription(rowData.description);
        let permissionsList: string[] = [];
        if (rowData.DashboardPermission) permissionsList.push('Dashboard');
        if (rowData.ClientesPermission) permissionsList.push('Clientes');
        if (rowData.ProdutosPermission) permissionsList.push('Produtos');
        if (rowData.VendasPermission) permissionsList.push('Vendas');
        if (rowData.MarketingPermission) permissionsList.push('Marketing');
        if (rowData.LojaPermission) permissionsList.push('Loja');
        if (rowData.IntegraçõesPermission) permissionsList.push('Integrações');
        setSelectedPermissions(permissionsList);
        setModalOpen(true);
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

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nome', width: 200 },
        { field: 'description', headerName: 'Descrição', width: 400 },
        { field: 'dashboardpermission', headerName: 'Dashboard', width: 100 },
        { field: 'clientespermission', headerName: 'Clientes', width: 100 },
        { field: 'produtospermission', headerName: 'Produtos', width: 100 },
        { field: 'vendaspermission', headerName: 'Vendas', width: 100 },
        { field: 'marketingpermission', headerName: 'Marketing', width: 100 },
        { field: 'lojapermission', headerName: 'Loja', width: 100 },
        { field: 'integraçõespermission', headerName: 'Integrações', width: 100 },
        {
            field: 'delete',
            headerName: 'Deletar',
            width: 100,
            renderCell: (_params) => (
                <>
                    <IconButton onClick={() => setShowDeleteConfirmation(true)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
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
                                onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection as string[])}
                                onRowClick={handleRowClick}
                                localeText={{
                                    toolbarDensity: 'Size',
                                    toolbarDensityLabel: 'Size',
                                    toolbarDensityCompact: 'Small',
                                    toolbarDensityStandard: 'Medium',
                                    toolbarDensityComfortable: 'Large',
                                }}
                                slots={{
                                    toolbar: GridToolbar,
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
