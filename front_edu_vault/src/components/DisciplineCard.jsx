import React from 'react';
import styles from '../styles/DisciplineCard.module.css';
import icon from '../images/icon.png'; // Импорт изображения

const DisciplineCard = () => {
  const disciplineData = {
    name: "ПРОГРАММНАЯ ИНЖЕНЕРИЯ",
    id: "123",
    labs: [
      { name: "Лабораторная работа №1", icon: icon }, 
      { name: "Лабораторная работа №2", icon: icon },
      { name: "Лабораторная работа №3", icon: icon },
      { name: "Лабораторная работа №4", icon: icon },
    ],
  };
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
            <img src={lab.icon} alt="file icon" className={styles.fileIcon} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplineCard;
