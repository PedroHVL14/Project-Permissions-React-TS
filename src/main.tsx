import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { AuthProvider } from './validations/authContext';
import { GroupProvider } from './pages/groups/groupContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GroupProvider>
        <RouterProvider router={router} />
      </GroupProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
