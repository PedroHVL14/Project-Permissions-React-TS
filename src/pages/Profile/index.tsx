import React, { useEffect, useState } from 'react';
import { Header } from '../App/Header';
import { api } from '../../lib/axios/axios';
import { StyledDiv } from '../Signup/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileUpdateSection } from './components/NameSection';
import { ProfileInformation } from './components/ProfileInformation';
import { ProfileSidebar } from './components/ProfileSidebar';

export const Profile: React.FC = () => {
    const methods = useForm();
    const [userInfo, setUserInfo] = useState<any>(null);
    const [companyInfo, setCompanyInfo] = useState<any>(null);
    const [activeSection, setActiveSection] = useState<string>('');
    const { control, handleSubmit } = useForm();
    const toggleSection = (section: string) => {
        if (activeSection === section) {
            setActiveSection('');
        } else {
            setActiveSection(section);
        }
    };
    useEffect(() => {
        const userId = localStorage.getItem('loggedInUserId');
        if (userId) {
            api.get(`/user/${userId}`)
                .then(response => {
                    setUserInfo(response.data);
                    return response.data.company_id;
                })
                .then(companyId => {
                    if (companyId) {
                        return api.get(`/company/${companyId}`);
                    }
                })
                .then(response => {
                    if (response) {
                        setCompanyInfo(response.data);
                    }
                })
                .catch(error => console.error("Erro ao buscar informações:", error));
        }
    }, []);
    
    return (
        <FormProvider {...methods}>
            <StyledDiv>
                <Header activeScreen="Perfil" fullWidth returnbutton={true} returnRoute="/App" returnButtonColor="#41b441" />

                <ProfileUpdateSection control={control} activeSection={activeSection} setActiveSection={setActiveSection} handleSubmit={handleSubmit} />

                <ProfileSidebar toggleSection={toggleSection} />

                <ProfileInformation userInfo={userInfo} companyInfo={companyInfo} activeSection={activeSection} />
            </StyledDiv>
        </FormProvider>
    );
}