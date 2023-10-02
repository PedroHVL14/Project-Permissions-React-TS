import React, { useState, MouseEvent } from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledOutlinedInput } from './styles';

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
    const [isFocused, setIsFocused] = useState(false);

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
                <FormControl variant="outlined">
                    <InputLabel 
                        htmlFor="outlined-adornment-password"
                        shrink={isFocused || field.value ? true : false}
                    >
                        Senha
                    </InputLabel>
                    <StyledOutlinedInput
                        {...field}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={!!error}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="start"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            )}
        />
    );
};
