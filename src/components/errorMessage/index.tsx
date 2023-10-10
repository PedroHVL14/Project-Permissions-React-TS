import React from 'react';
import { TypographyStyled } from './styles';

interface ErrorMessageProps {
    message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;
    return <TypographyStyled>{message}</TypographyStyled>;
}