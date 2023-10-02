import { StyledTextField } from "./styles";

interface CustomTextFieldProps {
    label: string;
    value: string;
    error?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomTextField ({ label, value, error, onChange }: CustomTextFieldProps) {
    return (
        <StyledTextField
            variant="outlined"
            margin="normal"
            required
            error={error}
            fullWidth
            label={label}
            value={value}
            onChange={onChange}
        />
    );
}
