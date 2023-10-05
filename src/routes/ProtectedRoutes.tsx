import { Navigate, Outlet } from 'react-router-dom';
import { SideBarHeader } from '../components/SidebarHeader';
import { useAuth } from '../validations/authContext';

export function ProtectedRoutes() {
    const { user } = useAuth();

    if (!user) return <Navigate to={'/login'} />

    return (
        <SideBarHeader>
            <Outlet />
        </SideBarHeader>
    );
}
