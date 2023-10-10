import React from 'react';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { ContentContainer, GeralContainer } from '../Profile/styles';
import { CenteredH2, NewStyledDiv, PrimaryButtonStyled } from '../employees/styles';
import { StyledDiv } from '../Signup/styles';

export const Groups: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Grupos" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <NewStyledDiv>
                            <CenteredH2>Grupos</CenteredH2>
                            <PrimaryButtonStyled>
                                Novo Grupo
                            </PrimaryButtonStyled>
                        </NewStyledDiv>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}