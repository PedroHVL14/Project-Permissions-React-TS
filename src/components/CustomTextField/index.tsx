import React, { forwardRef } from 'react';
import { StyledTextField } from "./styles";

interface CustomTextFieldProps {
    label: string;
    value?: string;
    defaultValue?: string;
    error?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(
  ({ label, value, defaultValue, error, onChange }, ref) => {
    return (
      <StyledTextField
        variant="outlined"
        margin="normal"
        required
        error={error}
        fullWidth
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);
