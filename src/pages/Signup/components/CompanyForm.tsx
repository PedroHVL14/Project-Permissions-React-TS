import React from 'react';
import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { validCNPJ } from "../../../validations/regexCNPJ";

export type CompanyProps = {
    companyName: string;
    cnpj: string;
    segment: string
}

interface CompanyFormProps {
    companyData: CompanyProps;
    handleCompanyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

const isCompanyDataValid = (companyData: CompanyProps): string => {
    if (!companyData.companyName || !companyData.cnpj || !companyData.segment) {
        return "Todos os campos são obrigatórios!";
    }
    if (!validCNPJ(companyData.cnpj)) {
        return "CNPJ inválido. Por favor, insira um CNPJ válido.";
    }
    return "";
}

export function CompanyForm({
    companyData,
    handleCompanyChange,
    handleSubmit
}: CompanyFormProps) {
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleFormSubmit = () => {
        const validationMessage = isCompanyDataValid(companyData);
        if (validationMessage) {
            setErrorMessage(validationMessage);
        } else {
            handleSubmit();
        }
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Cadastro - Empresa
            </Typography>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Box component="form" mt={3} width="100%">
                <CustomTextField
                    label="Nome da empresa"
                    name="companyName"
                    value={companyData.companyName}
                    onChange={handleCompanyChange} />

                <CustomTextField
                    label="CNPJ"
                    name="cnpj"
                    value={companyData.cnpj}
                    onChange={handleCompanyChange} />

                <CustomTextField
                    label="Segmento"
                    name="segment"
                    value={companyData.segment}
                    onChange={handleCompanyChange} />

                <PrimaryButton onClick={handleFormSubmit}>Próximo</PrimaryButton>
            </Box>
        </>
    );
}
