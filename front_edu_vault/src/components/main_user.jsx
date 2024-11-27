import React, { useEffect, useState } from 'react';
import styles from '../styles/main_user.module.css';

const DisciplineList = () => {
  const [faculties, setFaculties] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFaculties = await fetch('http://localhost:5000/api/faculties');
        const dataFaculties = await responseFaculties.json();
        setFaculties(dataFaculties);

        if (dataFaculties.length > 0) {
          const facultyId = dataFaculties[0].id;
          const responseDisciplines = await fetch(`http://localhost:5000/api/disciplines?facultyId=${facultyId}`);
          const dataDisciplines = await responseDisciplines.json();
          setDisciplines(dataDisciplines);
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
              {discipline.name}
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
