import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";

interface CompanySegmentSelectProps {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    error?: boolean;
}

export const CompanySegmentSelect = React.forwardRef<HTMLSelectElement, CompanySegmentSelectProps>((props, ref) => {
    const { value, onChange, error } = props;

    return (
        <FormControl fullWidth error={error}>
            <InputLabel id="company-segment-label">Segmento</InputLabel>
            <Select
                labelId="company-segment-label"
                id="company-segment-select"
                value={value}
                label="Segmento"
                onChange={onChange}
                inputRef={ref}>
                <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                <MenuItem value="Saúde">Saúde</MenuItem>
                <MenuItem value="Educação">Educação</MenuItem>
                <MenuItem value="Finanças">Finanças</MenuItem>
                <MenuItem value="Varejo">Varejo</MenuItem>
            </Select>
        </FormControl>
    );
});
