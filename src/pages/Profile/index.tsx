import React from 'react';
import { useAuth } from '../../validations/authContext';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { CenteredText, ContentContainer, GeralContainer, NewStyledDiv } from './styles';
import { StyledDiv } from '../Signup/styles';
import { Avatar } from '@mui/material';

export const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <NewStyledDiv>
                            <Avatar alt="TempAvatar" src="" sx={{ width: 200, height: 200 }} />
                        </NewStyledDiv>
                        <CenteredText>{user?.name}</CenteredText>
                        <CenteredText>{user?.email}</CenteredText>
                        <CenteredText>{user?.phone}</CenteredText>
                        <CenteredText>Gerente: {user?.is_manager ? "Sim" : "Não"}</CenteredText>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}