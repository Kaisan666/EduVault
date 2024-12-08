// src/components/Groups.js
import React, { useState, useEffect } from 'react';
import styles from './addDisciplineToTeacher.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';

const AddDisciplineToTeacher = () => {
  const { disciplineId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [discipline, setDiscipline] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [assignedTeachers, setAssignedTeachers] = useState([]);

  useEffect(() => {
    fetchDiscipline();
    fetchTeachers();
    fetchAssignedTeachers();
  }, []);

  const fetchDiscipline = async () => {
    const response = await axios.get(`http://localhost:5000/api/discipline/show-one/${disciplineId}`, { withCredentials: true });
    setDiscipline(response.data.name);
  };

  const fetchTeachers = async () => {
    const response = await axios.get(`http://localhost:5000/api/teacher/show-all`, { withCredentials: true });
    console.log('All Teachers:', response.data); // Логирование всех преподавателей
    setTeachers(response.data);
  };

  const fetchAssignedTeachers = async () => {
    const response = await axios.get(`http://localhost:5000/api/teacher_faculty/getTeachersByDiscipline/${disciplineId}`, { withCredentials: true });
    console.log('Assigned Teachers:', response.data); // Логирование назначенных преподавателей
    setAssignedTeachers(response.data);
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleAddTeacher = async () => {
    if (selectedTeacher) {
      try {
        await axios.post(`http://localhost:5000/api/teacher_faculty/giveTeacherDiscipline/${disciplineId}`, {
          teacherId: selectedTeacher
        },{withCredentials :true
            
        });
        alert('Преподаватель успешно добавлен!');
        setSelectedTeacher('');
        fetchAssignedTeachers(); // Обновить список назначенных преподавателей
      } catch (error) {
        console.error('Ошибка при добавлении преподавателя', error);
      }
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    console.log(teacherId)
    try {
      const response = await axios.delete(`http://localhost:5000/api/teacher_faculty/removeTeacherDiscipline/${disciplineId}/${teacherId}`,{withCredentials : true});
      console.log('Remove Teacher Response:', response); // Логирование ответа на удаление преподавателя
      alert('Преподаватель успешно удален!');
      fetchAssignedTeachers(); // Обновить список назначенных преподавателей
    } catch (error) {
      console.error('Ошибка при удалении преподавателя', error);
    }
  };

  // Фильтрация преподавателей, чтобы исключить уже назначенных
  const availableTeachers = teachers.filter(teacher => !assignedTeachers.some(assignedTeacher => assignedTeacher.id === teacher.id));
  console.log('Available Teachers:', availableTeachers); // Логирование доступных преподавателей

  return (
    <>
      <Header />
      <div className={styles.groupsContainer}>
        <div className={styles.courseFrame}>
          <h1>{discipline}</h1>
        </div>

        {/* Add the Back Button */}
        <div className={styles.backButtonContainer}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            Назад
          </button>
        </div>

        <h2>Добавить преподавателя</h2>
        <div className={styles.mainWrapper}>
          <div className={styles.groupsWrapper}>
            <select value={selectedTeacher} onChange={handleTeacherChange} className={styles.teacherSelect}>
              <option value="" disabled>Выберите преподавателя</option>
              {availableTeachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.lastName} {teacher.firstName} {teacher.middleName}
                </option>
              ))}
            </select>
            <button onClick={handleAddTeacher} className={styles.addButton}>
              Добавить
            </button>
          </div>
        </div>

        <h2>Назначенные преподаватели</h2>
        <div className={styles.assignedTeachersWrapper}>
          <ul className={styles.assignedTeachersList}>
            {assignedTeachers.map((teacher) => (
              <li key={teacher.id} className={styles.listItem}>
                {teacher.lastName} {teacher.firstName} {teacher.middleName}
                <button onClick={() => handleRemoveTeacher(teacher.id)} className={styles.removeButton}>
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddDisciplineToTeacher;
