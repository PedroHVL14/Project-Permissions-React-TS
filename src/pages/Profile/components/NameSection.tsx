import React from 'react';
import { Controller } from 'react-hook-form';
import { api } from '../../../lib/axios/axios';
import { StyledDivText } from '../styles';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { CustomTextField } from '../../../components/CustomTextField';

interface Props {
    control: any;
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (onValid: (data: any) => void) => any;
}
export const ProfileUpdateSection: React.FC<Props> = ({ control, activeSection, setActiveSection, handleSubmit }) => {
    const handleUpdate = handleSubmit(async (formData) => {
        const userId = localStorage.getItem('loggedInUserId');
        
        if (userId) {
            try {
                let dataToSend: { [key: string]: any } = {};
                
                switch (activeSection) {
                    case 'name':
                        dataToSend.name = formData.name;
                        break;
                    case 'phone':
                        dataToSend.phone = formData.phone;
                        break;
                    case 'password':
                        dataToSend.password = formData.password;
                        break;
                    default:
                        throw new Error('Seção de atualização não reconhecida.');
                }
    
                await api.put(`/user/update/${userId}`, dataToSend);
                setActiveSection('');
                window.location.reload();
            } catch (error) {
                console.error("Erro ao atualizar informações:", error);
            }
        }
    });
    
    return (
        <>
            {activeSection === 'name' && (
                    <>
                        <h3><StyledDivText>Alterar Nome</StyledDivText></h3>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <CustomTextField
                                    label="Nome"
                                    {...field}
                                />
                            )}
                        />
                        <PrimaryButton onClick={handleUpdate}>Atualizar</PrimaryButton>
                    </>
                )}
                {activeSection === 'phone' && (
                    <>
                        <h3><StyledDivText>Alterar Telefone</StyledDivText></h3>
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                                <CustomTextField
                                    label="Telefone"
                                    {...field}
                                />
                            )}
                        />
                        <PrimaryButton onClick={handleUpdate}>Atualizar</PrimaryButton>
                    </>
                )}
                {activeSection === 'password' && (
                    <>
                        <h3><StyledDivText>Alterar Senha</StyledDivText></h3>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <CustomTextField
                                    label="Senha"
                                    {...field}
                                />
                            )}
                        />
                        <PrimaryButton onClick={handleUpdate}>Atualizar</PrimaryButton>
                    </>
                )}
        </>
    );
}
