import { Box } from "@mui/material";
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { StyledDiv } from '../styles';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from "../../../components/errorMessage";
import { SignupProps } from "..";
import { CompanySegmentSelect } from "../../../components/CompanySegmentSelect";

export type CompanyProps = {
    companyName: string;
    cnpj: string;
    segment: string
}

interface CompanyFormProps {
    handleSubmit: () => void;
    control: Control<SignupProps, any>
}

export function CompanyForm({
    handleSubmit,
    control
}: CompanyFormProps) {
    const { watch, trigger } = useFormContext<SignupProps>();
    const companyName = watch('company.companyName');
    const cnpj = watch('company.cnpj');
    const segment = watch('company.segment');
    const allFieldsFilled = companyName && cnpj && segment;

    const handleButtonClick = async () => {
        const isValid = await trigger(['company.companyName', 'company.cnpj', 'company.segment']);

        if (isValid && allFieldsFilled) {
            handleSubmit();
        }
    }

    return (
        <>
            <Box component="form" mt={3} width="100%">
                <StyledDiv>
                    <Controller
                        control={control}
                        name='company.companyName'
                        rules={{ required: "Nome da empresa é obrigatório" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    label="Nome da empresa"
                                    error={!!error?.message}
                                    onChange={onChange}
                                    value={value} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                </StyledDiv>
                <StyledDiv>
                    <Controller
                        control={control}
                        name='company.cnpj'
                        rules={{ required: "CNPJ é obrigatório", validate: (value) => value.length <= 3 ? "Erro" : true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextField
                                    label='CNPJ'
                                    error={!!error?.message}
                                    onChange={onChange}
                                    value={value} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )} />
                </StyledDiv>
                <StyledDiv>
                    <Controller
                        control={control}
                        name='company.segment'
                        rules={{ required: "Segmento é obrigatório" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CompanySegmentSelect
                                    value={value}
                                    onChange={onChange}
                                    error={!!error?.message} />
                                <ErrorMessage message={error?.message} />
                            </>
                        )}
                    />
                </StyledDiv>
                <StyledDiv>
                    <PrimaryButton onClick={handleButtonClick}>Próximo</PrimaryButton>
                </StyledDiv>
            </Box>
        </>
    );
}
