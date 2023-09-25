import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Signup from './Signup/signup';
import Login from './Login/login';
import FirstPage from './FistPage/FirstPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/FirstPage" element={<FirstPage/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
