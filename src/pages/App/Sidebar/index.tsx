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
    IconWrapper,} from './styles';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../components/NavButton/styles';
import { Collapse, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Sidebar: React.FC<{ activeScreen: string }> = ({ activeScreen }) => {
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
    {
      label: "Usuário", icon: <AccountBoxIcon />, hasArrow: true, 
      subMenu: [
        { label: "Perfil", path: "/profile", icon: <ChevronRightIcon /> },
        { label: "Timeline", path: "/timeline", icon: <ChevronRightIcon /> }
      ]
    },
    { label: "Clientes", icon: <EmojiPeopleIcon />, hasArrow: true },
    { label: "Produtos", icon: <ShoppingBasketIcon />, hasArrow: true },
    { label: "Vendas", icon: <BarChartIcon /> },
    { label: "Marketing", icon: <LocalGroceryStoreIcon />, hasArrow: true },
    { label: "Loja", icon: <StoreIcon />, hasArrow: true },
    { label: "Integrações", icon: <ExtensionIcon /> },
    { label: "Ajustes", icon: <SettingsIcon /> },
  ];
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleSubmenu = (label: string) => {
    if (openSubmenu === label) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(label);
    }
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
                  style={item.label === activeScreen ? { backgroundColor: '#EBF3E7', color: '#41b441' } : {}}
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
                        style={subItem.label === activeScreen ? { backgroundColor: '#EBF3E7', color: '#41b441' } : {}}
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
