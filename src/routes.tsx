import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Signup } from './Signup';
import { Login } from './Login';
import { App } from './App';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/App" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
