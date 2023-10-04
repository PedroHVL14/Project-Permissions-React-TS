import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PasswordIcon from '@mui/icons-material/Password';
import { NavButtonStyled, Sidebar, SidebarButton, SidebarIcon } from '../styles';
import { StyledArrowIcon } from '../../App/Sidebar/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

interface Props {
    toggleSection: (section: string) => void;
}

export const ProfileSidebar: React.FC<Props> = ({ toggleSection }) => {
    return (
        <Sidebar>
            <SidebarButton onClick={() => toggleSection('name')}>
                <SidebarIcon><DriveFileRenameOutlineIcon /></SidebarIcon>Alterar nome<StyledArrowIcon />
            </SidebarButton>
            <SidebarButton onClick={() => toggleSection('phone')}>
                <SidebarIcon><LocalPhoneIcon /></SidebarIcon>Alterar telefone<StyledArrowIcon />
            </SidebarButton>
            <SidebarButton onClick={() => toggleSection('password')}>
                <SidebarIcon><PasswordIcon /></SidebarIcon>Alterar senha<StyledArrowIcon />
            </SidebarButton>
            <SidebarButton onClick={() => toggleSection('picture')}>
                <SidebarIcon><AccountCircleIcon /></SidebarIcon>Alterar foto de perfil<StyledArrowIcon />
            </SidebarButton>
            <SidebarButton onClick={() => toggleSection('graphic')}>
                <SidebarIcon><SignalCellularAltIcon /></SidebarIcon>Histórico de acessos<StyledArrowIcon />
            </SidebarButton>
            <NavButtonStyled label="sair" icon={<LogoutIcon />} path="/" />
        </Sidebar>
    );
}
