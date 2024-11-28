import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import styles from '../styles/main_user.module.css';

const DisciplineList = () => {
  const [faculties, setFaculties] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Симуляция получения данных о факультетах
        const fakeFaculties = [
          { id: 1, name: 'Факультет Информационных Технологий' },
          { id: 2, name: 'Факультет Машиностроения' }
        ];
        setFaculties(fakeFaculties);

        // Симуляция получения данных о дисциплинах для первого факультета
        if (fakeFaculties.length > 0) {
          const facultyId = fakeFaculties[0].id;
          const fakeDisciplines = [
            { id: 1, name: 'Программирование' },
            { id: 2, name: 'Алгоритмы и структуры данных' },
            { id: 3, name: 'Алгоритмы и структуры данных' },
            { id: 4, name: 'Алгоритмы и структуры данных' },
            { id: 5, name: 'Алгоритмы и структуры данных' },
            { id: 6, name: 'Алгоритмы и структуры данных' },
            { id: 7, name: 'Алгоритмы и структуры данных' },
            { id: 8, name: 'Сетевые технологии' }
          ];
          setDisciplines(fakeDisciplines);
        }

        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.disciplineContainer}>
      {faculties.length > 0 && (
        <h2 className={styles.lab}>
          {`ФАКУЛЬТЕТ: ${faculties[0].id} - ${faculties[0].name}`}
        </h2>
      )}
      <h2 className={styles.lab}>ЛАБОРАТОРНЫЕ РАБОТЫ</h2>

      <div className={styles.disciplineBox}>
        {disciplines.length > 0 ? (
          disciplines.map(discipline => (
            <div key={discipline.id} className={styles.disciplineItem}>
              {/* Используем Link для перехода на страницу с лабораторными работами по дисциплине */}
              <Link to={`/LabPage/${discipline.id}`} className={styles.disciplineLink}>
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
