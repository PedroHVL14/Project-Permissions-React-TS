import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
    email: string;
    password: string;
}

type UserDetailsProps = {
    email: string;
    password: string;
}

const navigate = useNavigate();
const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);

export const [loginData, setLoginData] = useState<LoginProps>({
    email: "",
    password: ""
});

export const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
        ...loginData,
        [e.target.name]: e.target.value
    });
};

export const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });


        if (response.status === 200) {
            const data = await response.json();
            setUserDetails(data);
            localStorage.setItem('loggedInEmail', loginData.email);
            console.log("E-mail logado:", loginData.email);
            navigate('/FirstPage');

        }
        else {
            alert("Erro no login. Verifique seu e-mail e senha.");
        }
    } catch (error) {
        alert("Erro ao tentar fazer login. Tente novamente mais tarde.");
    }
};