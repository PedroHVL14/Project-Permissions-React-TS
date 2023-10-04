import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PasswordIcon from '@mui/icons-material/Password';
import { Sidebar, SidebarButton, SidebarIcon } from '../styles';
import { StyledArrowIcon } from '../../App/Sidebar/styles';

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
        </Sidebar>
    );
}
