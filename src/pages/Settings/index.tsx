import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { ContentContainer, GeralContainer } from '../Profile/styles';
import { CustomTextField } from '../../components/CustomTextField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { StyledDiv } from '../Signup/styles';

export const Settings: React.FC = () => {
    const [name] = useState('');
    const [password] = useState('');
    const [currentPassword] = useState('');
    const [phone] = useState('');
    const { register, handleSubmit} = useForm<{
        name: string;
        password: string;
        currentPassword: string;
        phone: string;
    }>();

    const handleUpdateSettings = (data: any) => {
        console.log(data);
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
                            value={name} label="Nome"
                            {...register("name")}/>
                        <CustomTextField
                            value={phone} label="Número de Celular"
                            {...register("phone")}/>
                        <CustomTextField
                            value={currentPassword} label="Senha Atual"
                            {...register("currentPassword")}/>
                        <CustomTextField
                            value={password} label="Nova Senha"
                            {...register("password")}/>

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
