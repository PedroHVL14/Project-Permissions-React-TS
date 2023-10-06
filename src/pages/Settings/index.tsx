import React from 'react';
import { Header } from '../App/Header';
import { Sidebar } from '../App/Sidebar';

export const Settings: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar activeScreen="Settings" />
            <Header activeScreen="Ajustes" />
        </div>
    );
}
