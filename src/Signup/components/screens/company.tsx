import { Box, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { CompanyProps } from "../SignupTypes";

interface CompanyFormProps {
    companyData: CompanyProps;
    handleCompanyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage: string;
    handleSubmit: () => void;
}

export function CompanyForm({
    companyData,
    handleCompanyChange,
    errorMessage,
    handleSubmit
}: CompanyFormProps) {
    return (
        <>
            <Typography component="h1" variant="h5">
                Cadastro - Empresa
            </Typography>
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

                {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                <PrimaryButton onClick={handleSubmit}>Próximo</PrimaryButton>
            </Box>
        </>
    );
}
