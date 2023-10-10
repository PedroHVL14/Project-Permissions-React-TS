import { Box } from "@mui/material";
import { CustomTextField } from "../../../components/CustomTextField";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { SpecialStyledDiv, StyledDiv } from '../styles';
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
    const { trigger } = useFormContext<SignupProps>();

    const handleButtonClick = async () => {
        const isValid = await trigger(['company.companyName', 'company.cnpj', 'company.segment']);

        isValid && handleSubmit();
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
                        rules={{ required: "CNPJ é obrigatório", validate: (value) => value.length <= 3 ? "CNPJ invalido" : true }}
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
                <SpecialStyledDiv>
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
                </SpecialStyledDiv>
                <StyledDiv>
                    <PrimaryButton onClick={handleButtonClick}>Próximo</PrimaryButton>
                </StyledDiv>
            </Box>
        </>
    );
}
