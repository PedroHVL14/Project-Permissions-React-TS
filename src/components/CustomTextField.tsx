import { TextField } from "@mui/material";

interface CustomTextFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, name, value, onChange }) => {
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
