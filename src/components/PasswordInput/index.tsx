import React, { useState, MouseEvent } from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledTextField } from '../CustomTextField/styles';

interface IFormInput {
    email: string;
    password: string;
}

interface PasswordInputProps {
    control: Control<IFormInput>;
    name: "email" | "password";
    rules?: Record<string, any>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ control, name, rules }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: MouseEvent) => {
        event.preventDefault();
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <FormControl variant="outlined" fullWidth>
                    <StyledTextField
                        {...field}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={!!error}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        label="Senha"
                    />

                </FormControl>
            )}
        />
    );
};
