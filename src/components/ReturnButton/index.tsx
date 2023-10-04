import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReturnButtonStyled } from './styles';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

type ReturnButtonProps = {
    returnRoute: string;
    color?: string;
};

export const ReturnButton: React.FC<ReturnButtonProps> = ({ returnRoute, color}) => {
    const navigate = useNavigate();

    return (
        <ReturnButtonStyled 
            variant="contained"
            style={{ backgroundColor: color }}
            onClick={() => navigate(returnRoute)}
        >
            <KeyboardReturnIcon />
        </ReturnButtonStyled>
    );
};