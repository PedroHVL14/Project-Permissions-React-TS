import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { ContentContainer, GeralContainer } from '../Profile/styles';
import { CustomTextField } from '../../components/CustomTextField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { StyledDiv } from '../Signup/styles';
import { api } from '../../lib/axios/axios';

export const Settings: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            api.get(`/user/${loggedInUserId}`).then(response => {
                const userData = response.data;
                setName(userData.name);
                setPhone(userData.phone);
            });
        }
    }, []);

    const handleUpdateSettings = async (data: any) => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            try {
                const response = await api.post('/update-user', {
                    userId: parseInt(loggedInUserId),
                    name: data.name,
                    phone: data.phone,
                    currentPassword: data.currentPassword,
                    newPassword: data.password
                });
                alert(response.data.message);
            } catch (error) {
                console.error(error);
    
                if (error && typeof error === 'object' && 'response' in error) {
                    const errorResponse = error as { response?: { status?: number, data?: { reason?: string } } };
    
                    if (errorResponse.response && errorResponse.response.status === 401 && errorResponse.response.data?.reason === 'wrong-password') {
                        alert("Senha errada");
                    } else {
                        alert("Ocorreu um erro ao atualizar os detalhes");
                    }
                } else {
                    alert("Ocorreu um erro ao atualizar os detalhes");
                }
            }
        } else {
            alert("Usuário não está logado");
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <Typography variant="h4">Configurações</Typography>

                        <CustomTextField
                            value={name}
                            label="Nome"
                            {...register("name")}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <CustomTextField
                            value={phone}
                            label="Número de Celular"
                            {...register("phone")}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <CustomTextField
                            value={currentPassword} 
                            label="Senha Atual"
                            {...register("currentPassword")}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <CustomTextField
                            value={password} 
                            label="Nova Senha"
                            {...register("password")}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <PrimaryButton
                            onClick={handleSubmit(handleUpdateSettings)}>
                            Salvar
                        </PrimaryButton>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
};

