import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { AuthProvider } from './validations/authContext';
import { GroupProvider } from './pages/groups/groupContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={10000}>
      <AuthProvider>
        <GroupProvider>
          <RouterProvider router={router} />
        </GroupProvider>
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
