import React, { useEffect, useState } from 'react';
import styles from '../styles/PersonalCabinet.module.css';
import axios from 'axios';

const PersonalCabinet = ({userIdUrl}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/user/${userIdUrl}`)
        console.log(response.data)
        setUserData(response.data);
        
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
  console.log(userData)

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h2>{`${userData.lastName} ${userData.firstName} ${userData.middleName}`}</h2>
        <p><strong>Факультет:</strong> {userData.facultyName}</p>
        <p><strong>Направление:</strong> {userData.specialtyName}</p>
        <p><strong>Курс:</strong> {userData.number}</p>
        <p><strong>Группа:</strong> {userData.groupName}</p>
      </div>
    </div>
  );
};

export default PersonalCabinet;
