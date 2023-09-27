import { TextField } from "@mui/material";

interface CustomTextFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomTextField ({ label, name, value, onChange }: CustomTextFieldProps) {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
        />
    );
}
