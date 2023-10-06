import React from 'react';
import { useAuth } from '../../validations/authContext';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { ContentContainer, GeralContainer } from './styles';
import { StyledDiv } from '../Signup/styles';

export const Profile: React.FC = () => {
    const{user} = useAuth();

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar activeScreen="profile" />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <div>
                    <h2>Dados do Usuário:</h2>
                        <p><strong>Nome:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        </div>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}