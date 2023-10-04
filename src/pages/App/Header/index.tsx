import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    HeaderContainer,
    ScreenName,
    RightContainer,
    StyledAvatarButton,
} from './styles';
import { ReturnButton } from '../../../components/ReturnButton';
import { StyledDivText } from '../../Profile/styles';

type HeaderProps = {
    activeScreen: string;
    returnbutton: boolean;
    returnRoute?: string; 
    fullWidth?: boolean;
    returnButtonColor?: string;
};

export const Header: React.FC<HeaderProps> = ({ 
    activeScreen, 
    returnbutton, 
    returnRoute,
    returnButtonColor,
    fullWidth
 }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer fullWidth={fullWidth}>
        {returnbutton && returnRoute && 
        <ReturnButton returnRoute={returnRoute} color={returnButtonColor} />}
        <ScreenName><StyledDivText>{activeScreen}</StyledDivText></ScreenName>
        <RightContainer>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <StyledAvatarButton onClick={() => navigate('/profile')}>
                <AccountCircleIcon />
            </StyledAvatarButton>
        </RightContainer>
    </HeaderContainer>
  );
}