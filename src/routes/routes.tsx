import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Signup } from '../pages/Signup';
import { App } from '../pages/App';
import { Profile } from '../pages/Profile';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Settings } from '../pages/Settings';

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
        }
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
    {
      path: '/settings',
      element: <Settings />
    }
  ]);
