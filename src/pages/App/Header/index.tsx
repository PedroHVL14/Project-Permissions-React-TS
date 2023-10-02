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

interface HeaderProps {
    activeScreen: string;
    fullWidth?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeScreen, fullWidth }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer fullWidth={fullWidth}>
        <ScreenName>{activeScreen}</ScreenName>
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