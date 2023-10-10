import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExtensionIcon from '@mui/icons-material/Extension';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import {
  SidebarContainer,
  LogoImage,
  MenuList,
  MenuItem,
  StyledButton,
  StyledArrowIcon,
  IconWrapper,
} from './styles';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../components/NavButton/styles';
import { Collapse, CssBaseline } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
    {
      label: "Usuário", icon: <AccountBoxIcon />, hasArrow: true,
      subMenu: [
        { label: "Perfil", path: "/profile", icon: <ChevronRightIcon /> },
        { label: "TimeLine", path: "/timeline", icon: <ChevronRightIcon /> }
      ]
    },
    { label: "Funcionários", icon: <BadgeIcon />, path: "/employees" },
    { label: "Grupos", icon: <GroupsIcon />, path: "/groups" },
    { label: "Clientes", icon: <EmojiPeopleIcon />, hasArrow: true },
    { label: "Produtos", icon: <ShoppingBasketIcon />, hasArrow: true },
    { label: "Vendas", icon: <BarChartIcon /> },
    { label: "Marketing", icon: <LocalGroceryStoreIcon />, hasArrow: true },
    { label: "Loja", icon: <StoreIcon />, hasArrow: true },
    { label: "Integrações", icon: <ExtensionIcon /> },
    { label: "Ajustes", icon: <SettingsIcon />, path: "/settings" },
  ];
  const getCurrentOpenSubmenu = () => {
    for (let item of menuItems) {
      if (item.subMenu?.some(subItem => subItem.path === location.pathname)) {
        return item.label;
      }
    }
    return null;
  };
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(getCurrentOpenSubmenu);
  const toggleSubmenu = (label: string) => {
    if (openSubmenu === label) {
      setOpenSubmenu(null);
    } else {
      if (!openSubmenu) {
        setOpenSubmenu(label);
      }
      else if (!menuItems.find(item => item.label === openSubmenu)?.subMenu?.find(subItem => subItem.path === location.pathname)) {
        setOpenSubmenu(label);
      }
    }
  };
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarContainer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LogoImage src="https://i.ibb.co/qp1W9L3/image.png" alt="plug4sales-logo" />
        <MenuList>
          {menuItems.map(item => (
            <React.Fragment key={item.label}>
              <MenuItem>
                <StyledButton
                  startIcon={<IconWrapper>{item.icon}</IconWrapper>}
                  endIcon={item.hasArrow ? <StyledArrowIcon /> : null}
                  style={item.path === location.pathname ? { backgroundColor: '#EBF3E7', color: '#41b441' } : {}}
                  onClick={() => {
                    if (item.subMenu) {
                      toggleSubmenu(item.label);
                    } else {
                      item.path && handleNavigation(item.path);
                    }
                  }}
                >
                  {item.label}
                </StyledButton>
              </MenuItem>
              {item.subMenu && (
                <Collapse in={openSubmenu === item.label}>
                  {item.subMenu.map(subItem => (
                    <MenuItem key={subItem.label}>
                      <StyledButton
                        startIcon={<IconWrapper>{subItem.icon}</IconWrapper>}
                        style={subItem.path === location.pathname ? { backgroundColor: '#EBF3E7', color: '#41b441' } : {}}
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        {subItem.label}
                      </StyledButton>
                    </MenuItem>
                  ))}
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </MenuList>
      </ThemeProvider>
    </SidebarContainer>
  );
}