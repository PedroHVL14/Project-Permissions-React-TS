import { createContext, useContext, useState, ReactNode } from 'react';

interface Group {
    DashboardPermission: boolean;
    ClientesPermission: boolean;
    ProdutosPermission: boolean;
    VendasPermission: boolean;
    MarketingPermission: boolean;
    LojaPermission: boolean;
    IntegraçõesPermission: boolean;
    name: string;
    description: string;
}

interface GroupContextData {
    group: Group | null;
    setGroup: (group: Group) => void;
}

interface GroupProviderProps {
    children: ReactNode;
}

const GroupContext = createContext<GroupContextData>({} as GroupContextData);

export function GroupProvider({ children }: GroupProviderProps) {
    const [group, setGroup] = useState<Group | null>(null);
    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    );
}

export function useGroup() {
    const context = useContext(GroupContext);
    return context;
}
