import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReturnButtonStyled } from './styles';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

type ReturnButtonProps = {
    returnRoute: string;
};

export const ReturnButton: React.FC<ReturnButtonProps> = ({ returnRoute }) => {
    const navigate = useNavigate();

    return (
        <ReturnButtonStyled variant="contained" color="primary" onClick={() => navigate(returnRoute)}>
            <KeyboardReturnIcon />
        </ReturnButtonStyled>
    );
};
