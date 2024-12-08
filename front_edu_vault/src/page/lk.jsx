import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Хук для навигации
import Header from '../components/header';
import Footer from '../components/footer';
import PersonalCabinet from '../components/PersonalCabinet';
import styles from '../styles/LK.module.css';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const LK = () => {
  const navigate = useNavigate(); // Хук для навигации
  const { logout, isAuthenticated, userRole, userLogin, userId} = useAuth();
  const [data, setData] = useState()
  const {userIdUrl} = useParams()
  console.log(userId, userIdUrl)
  // Функция для выхода из личного кабинета
  const handleLogout = () => {
    // Удаляем информацию о пользователе (например, токен)
    logout()

    // Перенаправляем на страницу входа
    navigate('/');
  };
  useEffect(() =>{
    // const response = await axios.get(``)
  }, [])



  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <PersonalCabinet userIdUrl ={userIdUrl} />
        {userId == userIdUrl ? <button onClick={handleLogout} className={styles.logoutButton}>
          Выйти
        </button> : null}
        
      </main>
      <Footer />
    </div>
  );
};

export default LK;
