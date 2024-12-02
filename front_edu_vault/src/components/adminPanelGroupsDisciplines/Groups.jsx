// src/components/Groups.js
import React, { useState, useEffect } from 'react';
import styles from './Groups.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DisciplinesInCourse from './disciplinesInCourse';

const Groups = () => {
  const { courseId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [courseDetails, setCourseDetails] = useState('');

  useEffect(() => {
    fetchCourseDetails();
    fetchGroups();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
      const data = response.data;
      setCourseDetails(data.number);
    } catch (error) {
      console.error('Ошибка при получении информации о курсе:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/group/show-all/${courseId}`);
      const data = response.data;
      setGroups(data);
    } catch (error) {
      console.error('Ошибка при получении групп:', error);
    }
  };

  const handleAddGroup = async () => {
    if (newGroup.trim()) {
        try {
            const response = await axios.post(`http://localhost:5000/api/group/create-group/${courseId}`, {
                name: newGroup
            },
            {withCredentials: true});
            const newGroupData = response.data[0]; // Полный объект группы
            console.log(newGroupData);
            setGroups([...groups, newGroupData]); // Добавляем весь объект группы
            setNewGroup('');
            setIsAdding(false);
        } catch (error) {
            console.error('Ошибка при добавлении группы:', error);
        }
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`http://localhost:5000/api/group/${groupId}`);
      setGroups(groups.filter(group => group.id !== groupId));
    } catch (error) {
      console.error('Ошибка при удалении группы:', error);
    }
  };

  const handleCancel = () => {
    setNewGroup('');
    setIsAdding(false);
  };

  return (
    <div className={styles.groupsContainer}>
      <div className={styles.courseFrame}>
        <h1>Курс: {courseDetails}</h1>
      </div>
      
      {/* Add the Back Button */}
      <div className={styles.backButtonContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Назад
        </button>
      </div>

      <h2>Группы</h2>
      <div className={styles.mainWrapper}>
        <div className={styles.groupsWrapper}>
          <ul className={styles.groupsList}>
            {groups.map(group => (
              <li key={group.id} className={styles.groupItem}>
                <Link to={`/students/${group.id}`}>
                  <div>{group.name}</div>
                </Link>
                <button onClick={() => handleDeleteGroup(group.id)} className={styles.deleteButton}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          {isAdding ? (
            <div className={styles.addGroupForm}>
              <input
                type="text"
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                placeholder="Введите название группы"
                className={styles.inputField}
              />
              <div className={styles.buttonContainer}>
                <button onClick={handleAddGroup} className={styles.confirmButton}>
                  Добавить группу
                </button>
                <button onClick={handleCancel} className={styles.cancelButton}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsAdding(true)} className={styles.addButton}>
              Добавить группу
            </button>
          )}
        </div>
        <DisciplinesInCourse />
      </div>
    </div>
  );
};

export default Groups;
