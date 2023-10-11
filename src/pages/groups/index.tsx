import React, { useState } from 'react';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { ContentContainer, GeralContainer } from '../Profile/styles';
import { CenteredH2, NewStyledDiv, PrimaryButtonStyled } from '../employees/styles';
import { StyledDiv } from '../Signup/styles';
import { CustomTextField } from '../../components/CustomTextField';
import { ModalContainer, Overlay, SpaceBet, SpaceBotton, SpaceTop } from './styles';
import { EnhancedTransferList } from './components/EnhancedTransferList';

export const Groups: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

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
                                <CustomTextField label="Nome" />
                                <CustomTextField label="Descrição" />
                            </SpaceBotton>
                            <EnhancedTransferList />
                            <SpaceTop>
                                <SpaceBet>
                                    <PrimaryButtonStyled onClick={() => setModalOpen(false)}>
                                        Fechar
                                    </PrimaryButtonStyled>
                                </SpaceBet>
                                <SpaceBet>
                                    <PrimaryButtonStyled onClick={() => setModalOpen(false)}>
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
