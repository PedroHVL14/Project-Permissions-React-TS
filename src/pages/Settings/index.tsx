import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import { AvatarContainer, CameraIcon, CameraIconText, CameraIconWrapper, ContentContainer, GeralContainer, NewStyledDiv, StyledAvatar } from '../Profile/styles';
import { CustomTextField } from '../../components/CustomTextField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { StyledDiv } from '../Signup/styles';
import { api } from '../../lib/axios/axios';
import { useAuth } from '../../validations/authContext';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '../../components/errorMessage';
import { PasswordInput } from '../../components/PasswordInput';

export const Settings: React.FC = () => {
    const { user, login } = useAuth();
    const { handleSubmit, control, formState: { errors }, setValue } = useForm();
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (user) {
            setValue("name", user.name || "");
            setValue("phone", user.phone || "");
            setAvatarImage(user.photo || null);
        }
    }, [user, setValue]);
    

    const handleUpdate = async (data: any) => {
        try {
            const updateData = {
                ...data,
                currentPassword: data.password,
                photo: avatarImage
            };
    
            const response = await api.put(`/users/${user?.id}`, updateData);
            if (response.status === 200) {
                login(response.data);
                alert('Informações atualizadas com sucesso!');
            } else {
                alert('Erro ao atualizar informações.');
            }
        } catch (error) {
            alert('Erro ao atualizar informações.');
        }
    };
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    };
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <StyledDiv>
                        <Typography variant="h4">Editar</Typography>
                        <NewStyledDiv>
                            <AvatarContainer onClick={handleAvatarClick}>
                                <StyledAvatar
                                    className="styled-avatar"
                                    alt="TempAvatar"
                                    src={avatarImage || ""}
                                    sx={{ width: 200, height: 200 }}
                                />
                                <CameraIconWrapper className="camera-wrapper">
                                    <CameraIcon className="camera-icon" />
                                    <CameraIconText>NOVA FOTO</CameraIconText>
                                </CameraIconWrapper>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept=".png, .jpeg, .jpg"
                                    onChange={handleFileChange}
                                />
                            </AvatarContainer>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept=".png, .jpeg, .jpg"
                                onChange={handleFileChange}
                            />
                        </NewStyledDiv>

                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Nome é obrigatório" }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <CustomTextField
                                        {...field}
                                        label="Nome"
                                        error={!!error}
                                    />
                                    <ErrorMessage message={typeof errors.name?.message === 'string' ? errors.name.message : undefined} />
                                </>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Número de Celular é obrigatório" }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <CustomTextField
                                        {...field}
                                        label="Número de Celular"
                                        error={!!error}
                                    />
                                    <ErrorMessage message={typeof errors.phone?.message === 'string' ? errors.phone.message : undefined} />
                                </>
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Senha é obrigatória" }}
                            render={() => (
                                <>
                                    <StyledDiv>
                                        <PasswordInput
                                            control={control}
                                            name="password"
                                            rules={{ required: "Senha é obrigatória" }}
                                        />
                                    </StyledDiv>
                                    <ErrorMessage message={typeof errors.password?.message === 'string' ? errors.password.message : undefined} />
                                </>
                            )}
                        />

                        <PrimaryButton onClick={handleSubmit(handleUpdate)}>
                            Salvar
                        </PrimaryButton>
                    </StyledDiv>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
};
