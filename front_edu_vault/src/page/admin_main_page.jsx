import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/admin_main_page.module.css';
import axios from 'axios';

const Admin_main_page = () => {
  const [faculties, setFaculties] = useState([]);
  const [directions, setDirections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFaculties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/faculty/all-faculties`)
      const data = response.data
      console.log(data)
      setFaculties(data);
    } catch (error) {
      console.error('Ошибка при получении факультетов:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDirections = async (facultyId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/specialty/all-specialties/${facultyId}`)
      const data = response.data
      setDirections(data);
    } catch (error) {
      console.error('Ошибка при получении направлений:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async (directionId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/courses?directionId=${directionId}`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Ошибка при получении курсов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleFacultyChange = (event) => {
    const facultyId = event.target.value;
    setSelectedFaculty(facultyId);
    setDirections([]);  
    setCourses([]);    
    if (facultyId) {
      fetchDirections(facultyId);
    }
  };

  const handleDirectionChange = (event) => {
    const directionId = event.target.value;
    setSelectedDirection(directionId);
    setCourses([]);  
    if (directionId) {
      fetchCourses(directionId);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent}>
        
        
        <div className={styles.dropdownContainer}>
          <label htmlFor="faculty">Выберите факультет:</label> {/* Заголовок на русском */}
          <select
            id="faculty"
            value={selectedFaculty}
            onChange={handleFacultyChange}
            disabled={loading}
          >
            <option value="">Выберите факультет</option> {/* Заголовок на русском */}
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        {selectedFaculty && (
          <div className={styles.dropdownContainer}>
            <label htmlFor="direction">Выберите направление:</label> {/* Заголовок на русском */}
            <select
              id="direction"
              value={selectedDirection}
              onChange={handleDirectionChange}
              disabled={loading}
            >
              <option value="">Выберите направление</option> {/* Заголовок на русском */}
              {directions.map((direction) => (
                <option key={direction.id} value={direction.id}>
                  {direction.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDirection && (
          <div className={styles.dropdownContainer}>
            <label htmlFor="course">Выберите курс:</label> {/* Заголовок на русском */}
            <select
              id="course"
              disabled={loading}
            >
              <option value="">Выберите курс</option> {/* Заголовок на русском */}
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Admin_main_page;
