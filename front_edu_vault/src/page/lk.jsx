import React from 'react';
import { useNavigate } from 'react-router-dom'; // Хук для навигации
import Header from '../components/header';
import Footer from '../components/footer ';
import PersonalCabinet from '../components/PersonalCabinet';
import styles from '../styles/LK.module.css';

const LK = () => {
  const navigate = useNavigate(); // Хук для навигации

  // Функция для выхода из личного кабинета
  const handleLogout = () => {
    // Удаляем информацию о пользователе (например, токен)
    localStorage.removeItem('authToken'); // Удаляем токен или другие данные

    // Перенаправляем на страницу входа
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <PersonalCabinet />
        {/* Кнопка "Выйти" */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Выйти
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default LK;
