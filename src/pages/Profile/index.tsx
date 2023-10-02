import React, { useEffect, useState } from 'react';
import { Header } from '../App/Header';
import { ReturnButton } from '../../components/ReturnButton';
import { StyledDiv } from '../Signup/styles';
import { api } from '../../lib/axios/axios';

export const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [companyInfo, setCompanyInfo] = useState<any>(null);

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
        <StyledDiv>
            <Header activeScreen="Perfil" fullWidth />
            <div style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                <ReturnButton returnRoute={'/App'} />
            </div>
            <div>
                {userInfo && (
                    <div>
                        <h3>Informações do Perfil:</h3>
                        <p>Nome: {userInfo.name}</p>
                        <p>Email: {userInfo.email}</p>
                        <p>Telefone: {userInfo.phone}</p>
                        <p>É gerente? {userInfo.is_manager ? "Sim" : "Não"}</p>
                        <p>Criado em: {new Date(userInfo.created_at).toLocaleDateString()}</p>
                        <p>Atualizado em: {new Date(userInfo.updated_at).toLocaleDateString()}</p>
                    </div>
                )}
                {companyInfo && (
                    <div>
                        <h3>Informações da Empresa:</h3>
                        <p>Nome da empresa: {companyInfo.name}</p>
                        <p>CNPJ: {companyInfo.cnpj}</p>
                        <p>Segmento: {companyInfo.segment}</p>
                    </div>
                )}
            </div>
        </StyledDiv>
    );
}
