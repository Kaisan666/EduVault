// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Проверка аутентификации при загрузке приложения
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/auth'); // Используем ваш маршрут
        if (response.data) {
          setIsAuthenticated(true);
          setUserRole(response.data.roleName); // Предполагаем, что роль находится в поле roleName
        }
      } catch (error) {
        console.error('Failed to check authentication', error);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password }); // Замените на ваш путь
      setIsAuthenticated(true);
      setUserRole(response.data.roleName); // Предполагаем, что роль находится в поле roleName
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout'); // Замените на ваш путь
      setIsAuthenticated(false);
      setUserRole(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
