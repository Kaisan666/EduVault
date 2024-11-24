import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/adding_directions.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Courses() {
  const { specialtyId } = useParams();
  console.log(specialtyId);
  const [courses, setCourses] = useState([]);
  const [newCourseNumber, setNewCourseNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Загрузка всех курсов для специальности при монтировании компонента
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/all-courses/${specialtyId}`);
        console.log(response);
        if (response.status === 200) {
          setCourses(response.data);
        } else {
          console.error('Ошибка при загрузке курсов');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchCourses();
  }, [specialtyId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCourseNumber('');
  };

  const handleAddCourse = useCallback(async () => {
    const newCourse = { number: newCourseNumber };

    try {
      const response = await axios.post(`http://localhost:5000/api/course/create-course/${specialtyId}`, newCourse);
      if (response.status === 200 || response.status === 201) {
        const savedCourse = response.data[0];
        setCourses((prevCourses) => [...prevCourses, savedCourse]);
        closeModal();
      } else {
        console.error('Ошибка при добавлении курса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }, [newCourseNumber, specialtyId]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= 10) {
      setNewCourseNumber(value);
    }
  };

  return (
    <div className={styles.facultyContainer}>
      <div className={styles.sidebar}>
        {courses.map((course) => (
          <Link to={`/group/all-groups/${course.id}`} key={course.id}>
            <div className={styles.directionItem}>
              {course.number}
            </div>
          </Link>
        ))}
        <button onClick={openModal} className={styles.addDirectionButton}>
          Добавить курс
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalHeading}>Добавить курс</h2>
            <input
              type="number"
              placeholder="Номер курса"
              value={newCourseNumber}
              onChange={handleInputChange}
              className={styles.input}
              min="1"
              max="10"
            />
            <div className={styles.modalButtonContainer}>
              <button onClick={handleAddCourse} className={styles.confirmButton}>
                Добавить
              </button>
              <button onClick={closeModal} className={styles.cancelButton}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
