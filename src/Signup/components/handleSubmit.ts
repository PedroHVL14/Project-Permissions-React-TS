import { useState } from "react";
import { companyData, userData } from "./handlechange";
import { validCNPJ } from "../../validations/regexCNPJ";
import { isValidEmail } from "./isValidEmail";
import { useNavigate } from "react-router-dom";

export const [errorMessage, setErrorMessage] = useState("");
export const [step, setStep] = useState(1);
export const [companyId, setCompanyId] = useState<number | null>(null);
export const navigate = useNavigate();

export const handleSubmit = async () => {
    setErrorMessage("");
    if (step === 1) {
        if (!companyData.companyName || !companyData.cnpj || !companyData.segment) {
            setErrorMessage("Todos os campos são obrigatórios!");
            return;
        }
        if (!validCNPJ(companyData.cnpj)) {
            alert("CNPJ inválido. Por favor, insira um CNPJ válido.");
            return;
        }
        try {
            const response = await fetch("http://localhost:4000/signup/company", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(companyData)
            });
            if (response.status === 201) {
                const data = await response.json();
                setCompanyId(data.id);
                setStep(2);
            } else {
                alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
            }
        } catch (error) {
            alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
        }
    } else if (step === 2) {
        if (!isValidEmail(userData.email)) {
            setErrorMessage("Por favor, insira um e-mail válido.");
            return;
        }
        if (!userData.userName || !userData.email || !userData.password || !userData.phone) {
            setErrorMessage("Todos os campos são obrigatórios!");
            return;
        }
        const completeUserData = {
            ...userData,
            company_id: companyId
        };
        try {
            const response = await fetch("http://localhost:4000/signup/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(completeUserData)
            });
            if (response.status === 201) {
                navigate("/login");
            } else {
                alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
            }
        } catch (error) {
            alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
        }
    }
};