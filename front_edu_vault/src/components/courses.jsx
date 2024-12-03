// src/components/Courses.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Courses.module.css';
import axios from 'axios';
import { useParams, useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const Courses = () => {
  const { specialtyId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [facultyDetails, setFacultyDetails] = useState('');

  useEffect(() => {
    fetchFacultyDetails();
    fetchCourses();
  }, []);

  const fetchFacultyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/specialty/show-one/${specialtyId}`,
        {withCredentials : true}
      );
      console.log(specialtyId);
      const data = response.data;
      console.log(data);
      setFacultyDetails(data.name);
    } catch (error) {
      console.error('Ошибка при получении информации о направлении:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/course/all-courses/${specialtyId}`,{
        withCredentials : true
      });
      const data = response.data;
      setCourses(data);
    } catch (error) {
      console.error('Ошибка при получении курсов:', error);
    }
  };

  const handleAddCourse = async () => {
    if (newCourse.trim()) {
      try {
        const response = await axios.post(`http://localhost:5000/api/course/create-course/${specialtyId}`, {
          number: newCourse
        }, {withCredentials : true});
        const data = response.data[0];
        console.log(response.data[0]);
        const newCourseData = data;
        setCourses([...courses, newCourseData]);
        setNewCourse('');
        setIsAdding(false);
      } catch (error) {
        console.error('Ошибка при добавлении курса:', error);
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Проверка на цифры и диапазон от 1 до 8
    if (/^\d*$/.test(value) && (value === '' || (Number(value) >= 1 && Number(value) <= 8))) {
      setNewCourse(value);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/course/${courseId}`);
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
      
      {/* Add the Back Button */}
      <div className={styles.backButtonContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Назад
        </button>
      </div>

      <h2>Курсы</h2>
      <ul className={styles.coursesList}>
        {courses.map(course => (
          <li key={course.id} className={styles.courseItem}>
            <Link to={`/groups/${course.id}`}>
              <div className={styles.courseNumberWrapper}>{course.number}</div>
            </Link>
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
            onChange={handleChange}
            placeholder="Введите номер курса"
            className={styles.inputField}
            pattern="[1-8]" // HTML5 pattern для ограничения ввода только цифр от 1 до 8
            title="Введите число от 1 до 8"
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
