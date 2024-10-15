import React, { useState } from 'react';
import styles from '../styles/entrance.module.css'; 
import logo from '../images/logo_entrance.png'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Логика для входа
    try {
      await fakeLogin(username, password);
      console.log('Успешный вход');
    } catch (err) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

  const fakeLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'user' && password === 'pass') {
          resolve();
        } else {
          reject(new Error('Неверные данные'));
        }
      }, 1000);
    });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <img src={logo} alt="Логотип" className={styles.logo} /> {/* Добавлено изображение */}
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

export default LoginForm;
