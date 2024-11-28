// src/components/Groups.js
import React, { useState, useEffect } from 'react';
import styles from './Groups.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DisciplinesInCourse(){
    const {courseId} = useParams()
    const [disciplines, setDisciplines] = useState([])
    const [newDiscipline, setNewDiscipline] = useState("")
    const [isAdding, setIsAdding] = useState(false)

    async function fetchDisciplines() {
        const response = await axios.get(`http://localhost:5000/api/disciplin/show-all/${courseId}`)
        const data = response.data
    }
    function cancelAdding(){
        setIsAdding(false)
        setNewDiscipline("")
    }

    useEffect(() =>{
        fetchDisciplines()
    }, [])

    async function addDiscipline(){
        if (newDiscipline.trim()) {
            try {
                const response = await axios.post(`http://localhost:5000/api/discipline/create-discipline/${courseId}`, {
                    name: newDiscipline
                });
                const newDisciplineData = response.data[0]; // Полный объект группы
                console.log(newDisciplineData);
                setDisciplines([...discipline, newDisciplineData]); // Добавляем весь объект группы
                setNewDiscipline('');
                setIsAdding(false);
            } catch (error) {
                console.error('Ошибка при добавлении группы:', error);
            }
        }
    }

    return(
        <div>
            <ul>
            {disciplines.map(discipline =>(
                <li key={discipline.id} className={styles.disciplineListItem}>
                    <Link to={`/discipline/${discipline.id}`}>
                    <div>
                        {discipline.name}
                    </div>
                    </Link>
                    <button>✏️</button>
                    <button>🗑️</button>
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
              Добавить группу
            </button>
            <button onClick={cancelAdding} className={styles.cancelButton}>
              Отмена
            </button>
          </div>
            </div>
            
           
        ) : null}
        <button onClick={setIsAdding(true)}>Добавить дисциплину</button>

        </div>
    )
}