import { ContentContainer, GeralContainer } from "../Profile/styles";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function App() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <ContentContainer>
                <Header activeScreen="Dashboard" fullWidth />
                <GeralContainer>
                    <div style={{ marginLeft: "20px" }}>
                        <h1>Nome do projeto: plug4sales Permissions</h1>

                        <h2>Setup:</h2>
                        <ul>
                            <li>Banco de dados: Postgres (instalar máquina local)</li>
                            <li>Frontend: React (Criar com Vite) utilizando Material UI</li>
                            <li>Endpoints: n8n (instalar máquina local)</li>
                        </ul>

                        <h2>Definições:</h2>
                        <ul>
                            <li>Um usuário pode pertencer a um ou mais grupo de usuários.</li>
                            <li>Um usuário pode conter uma ou mais permissões.</li>
                            <li>Um grupo de usuários pode conter uma ou mais permissões.</li>
                            <li>O usuário deve respeitar as permissões dos grupos vinculados a ele.</li>
                        </ul>

                        <h2>Features:</h2>
                        <ul>
                            <li>Cadastro inicial '/signup'</li>
                            <li>Step 1 (Empresa)</li>
                            <ul>
                                <li>Nome da empresa</li>
                                <li>CNPJ</li>
                                <li>Segmento</li>
                            </ul>
                            <li>Step 2 (Usuário Admin (Contém todas as permissões))</li>
                            <ul>
                                <li>Nome do usuário</li>
                                <li>Email</li>
                                <li>Senha</li>
                                <li>Celular</li>
                                <li>Tela de login</li>
                                <li>Registrar acesso do usuário (data e hora)</li>
                                <li>Adicionar usuários na empresa</li>
                                <ul>
                                    <li>Nome</li>
                                    <li>Email</li>
                                    <li>Número de celular</li>
                                    <li>Foto</li>
                                    <li>Senha</li>
                                    <li>Vincular Permissões</li>
                                </ul>
                            </ul>
                            <li>Cadastro de grupos de usuários</li>
                            <ul>
                                <li>Nome</li>
                                <li>Vincular Permissões</li>
                            </ul>
                            <li>Alterar de grupos de usuários</li>
                            <ul>
                                <li>Nome</li>
                                <li>Alterar Permissões</li>
                            </ul>
                            <li>Tela de perfil do usuário</li>
                            <ul>
                                <li>Alterar foto</li>
                                <li>Alterar senha</li>
                                <li>Alterar nome</li>
                                <li>Alterar número de celular</li>
                                <li>Alterar Permissões</li>
                            </ul>
                            <li>Tela de listagem de usuários da empresa</li>
                            <ul>
                                <li>Adicionar gráfico com histórico de acessos (Biblioteca de gráficos)</li>
                                <li>Menu lateral simples contendo os módulos e aplicando as permissões. (habilitado/desabilitado)</li>
                            </ul>
                            <li>Dashboard</li>
                            <li>Clientes</li>
                            <li>Produtos</li>
                            <li>Vendas</li>
                            <li>Marketing</li>
                            <li>Loja</li>
                            <li>Integrações</li>
                            <li>Ajustes</li>
                        </ul>

                        <h2>Permissões / Módulos:</h2>
                        <ul>
                            <li>Dashboard</li>
                            <li>Clientes</li>
                            <li>Produtos</li>
                            <li>Vendas</li>
                            <li>Marketing</li>
                            <li>Loja</li>
                            <li>Integrações</li>
                            <li>Ajustes</li>
                        </ul>
                    </div>
                </GeralContainer>
            </ContentContainer>
        </div>
    );
}
