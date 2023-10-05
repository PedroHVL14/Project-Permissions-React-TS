import React, { useEffect, useState } from 'react';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';
import axios from 'axios';
import { ContentContainer, GeralContainer } from './styles';
import { api } from '../../lib/axios/axios';
import { useAuth } from '../../validations/authContext';

type UserType = {
    id: number;
    name: string;
    email: string;
    phone: string;
};

type CompanyType = {
    id: number;
    name: string;
    cnpj: string;
    segment: string;
};

export const Profile: React.FC = () => {
    const [userData, setUserData] = useState<UserType | null>(null);
    const [companyData, setCompanyData] = useState<CompanyType | null>(null);
    const{user} = useAuth();
    useEffect(() => {
        const userId = localStorage.getItem('loggedInUserId');
        if (userId) {
            api.get(`/user/${userId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });

            api.get(`/company/${userId}`)

                .then(response => {
                    setCompanyData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching company data:", error);
                });
        }
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar activeScreen="Perfil" />
            <ContentContainer>
                <Header activeScreen="Perfil" fullWidth />
                <GeralContainer>
                    <div>
                        {user?.name}
                    </div>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}