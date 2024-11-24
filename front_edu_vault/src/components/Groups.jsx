// src/components/Groups.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Groups.module.css';

const Groups = ({ courseId }) => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [courseDetails, setCourseDetails] = useState(''); // Обновляем состояние для имени курса

  useEffect(() => {
    fetchCourseDetails();
    fetchGroups();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      setCourseDetails(data.name);
    } catch (error) {
      console.error('Ошибка при получении информации о курсе:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/groups`);
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Ошибка при получении групп:', error);
    }
  };

  const handleAddGroup = async () => {
    if (newGroup.trim()) {
      try {
        const response = await fetch(`/api/courses/${courseId}/groups`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newGroup }),
        });
        const newGroupData = await response.json();
        setGroups([...groups, newGroupData]);
        setNewGroup('');
        setIsAdding(false);
      } catch (error) {
        console.error('Ошибка при добавлении группы:', error);
      }
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await fetch(`/api/courses/${courseId}/groups/${groupId}`, {
        method: 'DELETE',
      });
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
      <h2>Группы</h2>
      <ul className={styles.groupsList}>
        {groups.map(group => (
          <li key={group.id} className={styles.groupItem}>
            {group.name}
            <button onClick={() => handleDeleteGroup(group.id)} className={styles.deleteButton}>
              Удалить
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
  );
};

export default Groups;
