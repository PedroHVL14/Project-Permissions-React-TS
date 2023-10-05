import { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextData {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    
}

export interface User {
    id: number;
    name: string;
    email: string;
    photoURL?: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    const [user, setUser] = useState<User | null>(initialUser);

    function login(user: User) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
