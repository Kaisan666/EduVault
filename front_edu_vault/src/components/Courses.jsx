// src/components/Courses.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Courses.module.css';

const Courses = ({ facultyId }) => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [facultyDetails, setFacultyDetails] = useState(''); // Обновляем состояние для имени направления

  useEffect(() => {
    fetchFacultyDetails();
    fetchCourses();
  }, [facultyId]);

  const fetchFacultyDetails = async () => {
    try {
      const response = await fetch(`/api/faculties/${facultyId}`);
      const data = await response.json();
      setFacultyDetails(data.name);
    } catch (error) {
      console.error('Ошибка при получении информации о направлении:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`/api/faculties/${facultyId}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Ошибка при получении курсов:', error);
    }
  };

  const handleAddCourse = async () => {
    if (newCourse.trim()) {
      try {
        const response = await fetch(`/api/faculties/${facultyId}/courses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newCourse }),
        });
        const newCourseData = await response.json();
        setCourses([...courses, newCourseData]);
        setNewCourse('');
        setIsAdding(false);
      } catch (error) {
        console.error('Ошибка при добавлении курса:', error);
      }
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await fetch(`/api/faculties/${facultyId}/courses/${courseId}`, {
        method: 'DELETE',
      });
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Ошибка при удалении курса:', error);
    }
  };

  const handleCancel = () => {
    setNewCourse('');
    setIsAdding(false);
  };

  return (
    <div className={styles.coursesContainer}>
      <div className={styles.directionFrame}>
        <h1>{facultyDetails}</h1>
      </div>
      <h2>Курсы</h2>
      <ul className={styles.coursesList}>
        {courses.map(course => (
          <li key={course.id} className={styles.courseItem}>
            {course.name}
            <button onClick={() => handleDeleteCourse(course.id)} className={styles.deleteButton}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      {isAdding ? (
        <div className={styles.addCourseForm}>
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            placeholder="Введите название курса"
            className={styles.inputField}
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleAddCourse} className={styles.confirmButton}>
              Добавить курс
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className={styles.addButton}>
          Добавить курс
        </button>
      )}
    </div>
  );
};

export default Courses;
