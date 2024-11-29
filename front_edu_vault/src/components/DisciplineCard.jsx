import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для перехода по маршруту
import styles from '../styles/DisciplineCard.module.css';
import icon from '../images/icon.png'; 

const DisciplineCard = () => {
  const [disciplineData, setDisciplineData] = useState(null);

  // Имитируем загрузку данных
  useEffect(() => {
    const data = {
      id: 1,
      name: 'Программирование на Python',
      labs: [
        {
          name: 'Лабораторная работа 1',
        },
        {
          name: 'Лабораторная работа 2',
        }
      ]
    };
    
    setDisciplineData(data);
  }, []);

  if (!disciplineData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.greenSquare}>
          <span className={styles.disciplineName}>{disciplineData.name}</span>
          <span className={styles.disciplineId}>ID: {disciplineData.id}</span>
        </div>
      </div>
      <ul className={styles.labList}>
        {disciplineData.labs.map((lab, index) => (
          <li key={index} className={styles.labItem}>
            {lab.name}
            {/* Картинка оборачивается в ссылку с маршрутом на страницу с лабораторными работами */}
            <Link to={`/lab/${disciplineData.id}`}>
              <img src={icon} alt="file icon" className={styles.fileIcon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplineCard;
