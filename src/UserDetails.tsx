import React, { useEffect, useState } from "react";

interface UserDetailsProps {
  user: any;
  company: any;
}

interface User {
    id: number;
    company_id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    photo: string | null;
    is_manager: boolean;
    created_by: number | null;
    logintime: string;
  }
  
  interface Company {
    id: number;
    name: string;
    cnpj: string;
    segment: string;
  }
  
  interface Details {
    user: User | null;
    company: Company | null;
  }
  

const UserDetails: React.FC<UserDetailsProps> = () => {
    const [details, setDetails] = useState<Details>({ user: null, company: null });

  useEffect(() => {
    const fetchDetails = async () => {
      const email = localStorage.getItem("loggedInEmail");
      if (email) {
        try {
          const response = await fetch(`http://localhost:4000/user/details?email=${email}`);
          const data = await response.json();
          setDetails(data);
        } catch (error) {
          console.error("Erro ao buscar detalhes do usuário.", error);
        }
      }
    };
    
    fetchDetails();
  }, []);

  return (
    <div>
      {details.user && (
        <>
          <h1>Detalhes do Usuário</h1>
          <p>Nome: {details.user.name}</p>
          <p>Email: {details.user.email}</p>
          <p>Celular: {details.user.phone}</p>
          <p>Hora de Login: {details.user.logintime}</p>
        </>
      )}
      {details.company && (
        <>
          <h1>Detalhes da Empresa</h1>
          <p>Nome da empresa: {details.company.name}</p>
          <p>CNPJ: {details.company.cnpj}</p>
          <p>Segmento: {details.company.segment}</p>
        </>
      )}
    </div>
  );
};

export default UserDetails;
