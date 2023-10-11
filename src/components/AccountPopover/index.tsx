import { useState } from 'react';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, Popover } from '@mui/material';
import { PopoverPaperProps, StyledAvatarButton } from './styles';
import { User, useAuth } from '../../validations/authContext';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

type AccountPopoverProps = {
    userInfo: User | null;
    onLogout: () => void;
};

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: <HomeIcon />,
        path: '/'
    },
    {
        label: 'Perfil',
        icon: <PersonIcon />,
        path: '/profile'
    },
    {
        label: 'Configurações',
        icon: <SettingsIcon />,
        path: '/settings'
    },
];

export default function AccountPopover({ userInfo, onLogout }: AccountPopoverProps) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [open, setOpen] = useState<null | EventTarget & HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };
    const handleMenuClick = (path: string) => {
        navigate(path);
        handleClose();
    };
    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <StyledAvatarButton onClick={handleOpen}>
                {userInfo && <Avatar src={user?.photo} alt="photoURL" />}
            </StyledAvatarButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={PopoverPaperProps}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    {userInfo && <Typography variant="subtitle2" noWrap>{userInfo.name}</Typography>}
                    {userInfo && <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>{userInfo.email}</Typography>}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem key={option.label} onClick={() => handleMenuClick(option.path)}>
                            <Box display="flex" alignItems="center" color="#363636" marginLeft={"-10px"}>
                                {option.icon}
                                <Box ml={1}>{option.label}</Box>
                            </Box>
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={onLogout} sx={{ m: 1, color: "red" }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
