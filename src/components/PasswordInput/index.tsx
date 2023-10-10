import React, { useState, MouseEvent } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledTextField } from '../CustomTextField/styles';

interface PasswordInputProps<T extends FieldValues> {
    control: Control<T>;
    name: keyof T;
    rules?: Record<string, any>;
}

export const PasswordInput: React.FC<PasswordInputProps<any>> = ({ control, name, rules }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: MouseEvent) => {
        event.preventDefault();
    };

    return (
        <Controller
            name={name as string}
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
