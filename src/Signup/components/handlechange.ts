import { useState } from "react";

export const [companyData, setCompanyData] = useState({
    companyName: "",
    cnpj: "",
    segment: ""
});
export const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: ""
});

export const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
        ...companyData,
        [e.target.name]: e.target.value
    });
};

export const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
        ...userData,
        [e.target.name]: e.target.value
    });
};