import React, { useState } from 'react';
import styles from '../styles/entrance.module.css';
import logo from '../images/logo_entrance.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [data, setData] = useState({
    password: "",
    login: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`http://localhost:5000/api/user/login`, data);
      const responseData = response.data;
      console.log(responseData);

      if (response.status !== 200) {
        throw new Error(responseData.message || 'Ошибка при входе');
      }

      // Сохраняем токен и роль в localStorage
      localStorage.setItem('authToken', responseData.token);
      localStorage.setItem('userRole', responseData.role);
      localStorage.setItem("facultyId", responseData.facultyId)

      // Перенаправляем пользователя на соответствующую страницу в зависимости от его роли
      if (responseData.role === 'Студент') {
        navigate('/main');
      } else if (responseData.role === 'Секретарь') {
        navigate('/secretaryDashBoard');
      } else {
        navigate('/');
      }

    } catch (err) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

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
            value={data.login}
            onChange={(e) => setData({ ...data, login: e.target.value })}
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Пароль"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
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
