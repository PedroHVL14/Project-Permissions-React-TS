import React, { useState } from 'react';
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

export const Groups: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { user } = useAuth();
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
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
        </div>
    );
}
