import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import {
    HeaderContainer,
    ScreenName,
    RightContainer,
    StyledAvatarButton,
} from './styles';

interface HeaderProps {
    activeScreen: string;
}

export const Header: React.FC<HeaderProps> = ({ activeScreen }) => {
  return (
    <HeaderContainer>
        <ScreenName>{activeScreen}</ScreenName>
        <RightContainer>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <StyledAvatarButton>
                <AccountCircleIcon />
            </StyledAvatarButton>
        </RightContainer>
    </HeaderContainer>
  );
}
