import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Signup } from '../pages/Signup';
import { App } from '../pages/App';
import { Profile } from '../pages/Profile';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Settings } from '../pages/Settings';
import { Timeline } from '../pages/Timeline';
import EmployeesPage from '../pages/employees';
import { Groups } from '../pages/groups';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/timeline',
        element: <Timeline />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/employees',
        element: <EmployeesPage />
      },
      {
        path: '/groups',
        element: <Groups />
      },
    ]
  },
  {
    path: '/login',
    element: <Home />
  },
  {
    path: '/signup',
    element: <Signup />
  },
]);
