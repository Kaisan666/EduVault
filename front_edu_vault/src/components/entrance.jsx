// src/page/page_input.js
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/entrance.module.css"

const Entrance = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, userRole} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    if (isAuthenticated) {
      navigate('/main'); // Перенаправление на главную страницу после входа
    }
  };

  if (isAuthenticated) {
    console.log(userRole)
    if (userRole === "Студент" || userRole === "Староста" || userRole === "Преподаватель"){
      navigate('/main')
    }
    else if (userRole === 'Админ'){
      navigate('/adminDashboard')
    }
    else if (userRole === "Секретарь") {
      navigate('/specialties/1')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Entrance;
