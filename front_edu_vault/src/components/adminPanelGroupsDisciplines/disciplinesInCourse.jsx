import React, { useState, useEffect } from 'react';
import styles from './disciplinesInCourse.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DisciplinesInCourse() {
  const { courseId } = useParams();
  const [disciplines, setDisciplines] = useState([]);
  const [newDiscipline, setNewDiscipline] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const fetchDisciplines = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/discipline/show-all/${courseId}`);
      const data = response.data;
      setDisciplines(data);
    } catch (error) {
      console.error('Ошибка при получении дисциплин:', error);
    }
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setNewDiscipline("");
  };

  useEffect(() => {
    fetchDisciplines();
  }, [courseId]);

  const addDiscipline = async () => {
    if (newDiscipline.trim()) {
      try {
        const response = await axios.post(`http://localhost:5000/api/discipline/create-discipline/${courseId}`, {
          name: newDiscipline
        });
        const newDisciplineData = response.data[0]; // Полный объект дисциплины
        console.log(newDisciplineData);
        setDisciplines([...disciplines, newDisciplineData]); // Добавляем весь объект дисциплины
        setNewDiscipline('');
        setIsAdding(false);
      } catch (error) {
        console.error('Ошибка при добавлении дисциплины:', error);
      }
    }
  };
  const handleDeleteGroup = async (disciplineId) => {  
    try {
        await axios.delete(`http://localhost:5000/api/discipline/delete/${disciplineId}`)
      setDisciplines(disciplines.filter(discipline => discipline.id !== disciplineId));
    } catch (error) {
      console.error('Ошибка при удалении группы:', error);
    }
  };

  return (
    <div className={styles.disciplines}>
      <ul className={styles.disciplinesList}>
        {disciplines.map(discipline => (
          <li key={discipline.id} className={styles.disciplineListItem}>
            <Link to={`/discipline/${discipline.id}`}>
              <div>
                {discipline.name}
              </div>
            </Link>
            <button>✏️</button>
            <button onClick={() => handleDeleteGroup(discipline.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      {isAdding ? (
        <div>
          <input
            type="text"
            value={newDiscipline}
            onChange={(e) => setNewDiscipline(e.target.value)}
            placeholder="Название дисциплины"
            className={styles.inputField}
          />
          <div className={styles.buttonContainer}>
            <button onClick={addDiscipline} className={styles.confirmButton}>
              Добавить дисциплину
            </button>
            <button onClick={cancelAdding} className={styles.cancelButton}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Добавить дисциплину</button>
      )}
    </div>
  );
}
