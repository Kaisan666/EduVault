import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/entrance.module.css';
import logo from '../images/logo_entrance.png';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [data, setData] = useState({
    password: "",
    login: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/auth`, {
            withCredentials: true})
          if (response.data.userRole === "Студент" || response.data.userRole === "Староста") {
            navigate('/main');
          } else if (response.data.userRole === "Админ") {
            navigate('/adminDashboard');
          } else if (response.data.userRole === "Секретарь") {
            navigate('/secretaryDashboard');
          } else {
            navigate('/main');
          }
        } catch (err) {
          console.error('Ошибка при проверке аутентификации:', err);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`http://localhost:5000/api/user/login`, data, { withCredentials: true });
      const auth = await axios.get(`http://localhost:5000/api/user/auth`, { withCredentials: true });

      console.log(auth.data.userRole);

      let targetRoute = '/main';
      if (auth.data.userRole === "Админ") {
        targetRoute = '/adminDashboard';
      } else if (auth.data.userRole === "Секретарь") {
        targetRoute = '/secretaryDashboard';
      }

      console.log(auth.data);
      const responseData = response.data;

      console.log(responseData);

      if (response.status !== 200) {
        throw new Error(responseData.message || 'Ошибка при входе');
      }

      // Сохраняем токен и роль в куки
      Cookies.set('token', responseData.token, { httpOnly: true, secure: false });
      Cookies.set('userRole', responseData.role, { httpOnly: true, secure: false });
      Cookies.set("facultyId", responseData.facultyId, { httpOnly: true, secure: false });

      // Перенаправляем пользователя на соответствующую страницу в зависимости от его роли
      navigate(targetRoute);

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
