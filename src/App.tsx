import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Message from './Message';

export type UserInStorageType = {
  message: string;
  userDetails: {
    token: string;
    user: {
      createAt?: string;
      email: string;
      first_name: string;
      last_name: string;
      password: string;
      received_mails?: string[];
      sent_mails?: string[];
      updatedAt?: string;
      _id?: string;
    };
  };
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userFromStorage: UserInStorageType =
    localStorage.getItem('User') &&
    JSON.parse(localStorage.getItem('User') || '');

  useEffect(() => {
    //todo: If on the register page and token exists, redirect to home
    if (location.pathname === '/register') {
      if (userFromStorage?.userDetails?.token) {
        navigate('/');
      }
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={!userFromStorage?.userDetails?.token ? <Register /> : <Home />}
      />
      <Route
        path="/register"
        element={!userFromStorage?.userDetails?.token ? <Register /> : <Home />}
      />
      <Route
        path="/messages"
        element={
          !userFromStorage?.userDetails?.token ? <Register /> : <Message />
        }
      />
    </Routes>
  );
};

export default App;
