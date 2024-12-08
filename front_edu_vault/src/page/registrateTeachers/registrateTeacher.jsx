import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './registrateTeacher.module.css';
import { useParams } from 'react-router-dom';
import TeacherInputForm from './components/inputForm/teacherInputForm';
import AddTeacherButton from './components/addButton/addButton';
import DeleteButton from './components/deleteButton/deleteButton'; // Добавьте импорт для DeleteButton

const TeacherRegistration = () => {
  const { facultyId } = useParams();
  const [teachers, setTeachers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  console.log(isAdding);

  const setAdding = (value) => {
    setIsAdding(value);
  };

  const setTeachersList = (value) => {
    setTeachers(value);
  };

  async function handleAddSecretary() {
    console.log(userData);
    const newSecretary = { ...userData };
    console.log(newSecretary);
    const response = await axios.post(`http://localhost:5000/api/secretary/create/${facultyId}`, newSecretary);
    create(newSecretary);
    const data = response.data[0];
    console.log(data);
    hideAddSecretary();
    console.log(`Добавить секретаря: Логин:, Пароль:`);
  };

  useEffect(() => {
    async function getTeachers() {
      try {
        const response = await axios.get(`http://localhost:5000/api/teacher/show-all`, { withCredentials: true });
        console.log(response.data);
        setTeachers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("СоСИ");
        } else {
          console.error('Ошибка при загрузке преподавателей:', error);
        }
      }
    }

    getTeachers();
  }, []);

  console.log(teachers);

  return (
    <div className={styles.wrapper}>
      {isAdding ? (
        <TeacherInputForm
          teacherList={teachers}
          setTeachersList={setTeachersList}
          setAdding={setIsAdding}
        />
      ) : null}

      <AddTeacherButton setAdding={setAdding} />

      <div className={styles.wrapperOfMain}>
        <ul className={styles.secretariesList}>
          {teachers.map((teacher) => (
            <li key={`${teacher.id}-${teacher.firstName}-${teacher.lastName}`} className={styles.secretariesListItem}>
              <div>
                <div>Имя: {teacher.firstName}</div>
                <div>Фамилия: {teacher.lastName}</div>
                <div>Отчество: {teacher.middleName}</div>
                <div>Логин: {teacher.login}</div>
                <div>Пароль: {teacher.password}</div>
              </div>
              <DeleteButton
              teacherList={teachers}
              setTeacherList={setTeachers}
              TeacherId={teacher.id}
              >Удалить</DeleteButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherRegistration;
