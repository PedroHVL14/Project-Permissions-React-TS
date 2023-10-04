import { StyledDivText } from "../styles";

interface ProfileInformationProps {
    userInfo: any;
    companyInfo: any;
    activeSection: string;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({ userInfo, companyInfo, activeSection }) => {
    if (activeSection !== '') {
        return null;
    }

    return (
        <StyledDivText>
            {userInfo && (
                <div>
                    <h3>Informações do Perfil:</h3>
                    <p>Nome: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Telefone: {userInfo.phone}</p>
                    <p>É gerente? {userInfo.is_manager ? "Sim" : "Não"}</p>
                    <p>Criado em: {new Date(userInfo.created_at).toLocaleDateString()}</p>
                    <p>Atualizado em: {new Date(userInfo.updated_at).toLocaleDateString()}</p><br />
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
        </StyledDivText>
    );
}
