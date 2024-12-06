import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import styles from '../styles/main_user.module.css';
import axios from 'axios';

const DisciplineList = () => {
  const [userData, setUserData] = useState(null);
  const [group, setGroup] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUserInfo() {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/auth`, { withCredentials: true });
      setUserData(response.data);
      console.log(response.data.userGroup);
      setGroup(response.data.userGroup);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function fetchDisciplines() {
      if (userData && (userData.userRole === "Студент" || userData.userRole === "Староста")) {
        try {
          const response = await axios.get(`http://localhost:5000/api/discipline/disciplines-all`, { withCredentials: true });
          console.log(response.data);
          setDisciplines(response.data);
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchDisciplines();
  }, [userData]);

  useEffect(() => {
    console.log(userData); // Логирование обновленного состояния userData
  }, [userData]);

  return (
    <div className={styles.disciplineContainer}>
      {group && group.length > 0 && (
        <h2 className={styles.lab}>
          {`ГРУППА: ${group}`}
        </h2>
      )}
      <h2 className={styles.lab}></h2>

      <div className={styles.disciplineBox}>
        {disciplines.length > 0 ? (
          disciplines.map(discipline => (
            <div key={discipline.id} className={styles.disciplineItem}>
              {/* Используем Link для перехода на страницу с лабораторными работами по дисциплине */}
              <Link to={`/LabsPage/${discipline.id}`} className={styles.disciplineLink}>
                {discipline.name}
              </Link>
            </div>
          ))
        ) : (
          <div>Нет доступных дисциплин</div>
        )}
      </div>
    </div>
  );
};

export default DisciplineList;
