import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Signup from './signup';
import Login from './login';
import UserDetails from './UserDetails';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/UserDetails" element={<UserDetails user={undefined} company={undefined} />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
