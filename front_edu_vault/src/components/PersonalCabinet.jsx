import React, { useEffect, useState } from 'react';
import styles from '../styles/PersonalCabinet.module.css';

const PersonalCabinet = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = {
          lastName: 'Иванов',
          firstName: 'Иван',
          middleName: 'Иванович',
          faculty: 'Факультет информатики',
          direction: 'Программирование',
          course: 3,
          group: 'ИВТ-301'
        };

        await new Promise(resolve => setTimeout(resolve, 1000));

        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h2>{`${userData.lastName} ${userData.firstName} ${userData.middleName}`}</h2>
        <p><strong>Факультет:</strong> {userData.faculty}</p>
        <p><strong>Направление:</strong> {userData.direction}</p>
        <p><strong>Курс:</strong> {userData.course}</p>
        <p><strong>Группа:</strong> {userData.group}</p>
      </div>
    </div>
  );
};

export default PersonalCabinet;
