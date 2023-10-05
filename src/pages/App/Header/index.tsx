import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import {
    HeaderContainer,
    ScreenName,
    RightContainer,
    LeftContainer,
} from './styles';
import { StyledDivText } from '../../Profile/styles';
import { useAuth } from '../../../validations/authContext';
import AccountPopover from '../../../components/AccountPopover';

type HeaderProps = {
    activeScreen: string;
    fullWidth?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
    activeScreen,
    fullWidth
}) => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <HeaderContainer fullWidth={fullWidth}>
            <>
                <LeftContainer>
                    <ScreenName>
                        <StyledDivText>{activeScreen}</StyledDivText>
                    </ScreenName>
                </LeftContainer>
                <RightContainer>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    {user && <AccountPopover userInfo={user} onLogout={handleLogout} />}
                </RightContainer>

            </>
        </HeaderContainer>
    );
}
