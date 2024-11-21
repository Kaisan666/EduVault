import React, { useState, useEffect } from 'react';
import styles from '../styles/DisciplineCard.module.css';
import icon from '../images/icon.png'; 

const DisciplineCard = () => {
  const [disciplineData, setDisciplineData] = useState(null);

 
  useEffect(() => {
    
    fetch() 
      .then((response) => response.json())
      .then((data) => setDisciplineData(data))
      .catch((error) => console.error('Ошибка при загрузке данных:', error));
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
            <a href={lab.fileUrl} target="_blank" rel="noopener noreferrer">
              <img src={icon} alt="file icon" className={styles.fileIcon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplineCard;
