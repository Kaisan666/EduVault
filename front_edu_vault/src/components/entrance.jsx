import React, { useState } from 'react';
import styles from '../styles/entrance.module.css';
import logo from '../images/logo_entrance.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext';
const Entrance = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      if (isAuthenticated) {
        if (userRole === 'Студент' || userRole === 'Староста' || userRole === 'Преподаватель') {
          navigate('/main');
        } else if (userRole === 'Админ') {
          navigate('/adminDashboard');
        } else if (userRole === 'Секретарь') {
          navigate('/specialties/1');
        }
      }
    } catch (err) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    if (userRole === 'Студент' || userRole === 'Староста' || userRole === 'Преподаватель') {
      navigate('/main');
    } else if (userRole === 'Админ') {
      navigate('/adminDashboard');
    } else if (userRole === 'Секретарь') {
      navigate('/specialties/1');
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <img src={logo} alt="Логотип" className={styles.logo} />
        {error && <p className={styles.error}>{error}</p>}

        <div>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Entrance;
