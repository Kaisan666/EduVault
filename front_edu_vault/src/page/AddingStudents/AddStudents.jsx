import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Students.module.css";

export default function AddStudent() {
  const { groupId } = useParams();
  const [group, setGroup] = useState('');
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    roleId: 2,
    login: "",
    password: "",
    groupId : groupId
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchGroup();
    fetchStudents();
  }, []);

  const fetchGroup = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/group/${groupId}`,{withCredentials : true});
      const data = response.data;
      setGroup(data.name);
    } catch (error) {
      console.error('Ошибка при получении информации о курсе:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/all-students/${groupId}`, {withCredentials : true});
      const data = response.data;
      console.log(data);
      setStudents(data);
    } catch (error) {
      console.error('Ошибка при получении групп:', error);
    }
  };

  const handleAddStudent = async () => {
     {
      try {
        console.log(newStudent)
        const response = await axios.post(`http://localhost:5000/api/student/create-student/${groupId}`, newStudent, {withCredentials : true});
        console.log(response.data)
        const newStudentData = response.data[0]; // Полный объект группы
        console.log(newStudentData);
        setStudents([...students, newStudentData]); // Добавляем весь объект группы
        setNewStudent({
          firstName: "",
          lastName: "",
          middleName: "",
          roleId: 2,
          login: "",
          password: "",
          groupId : groupId
        });
        setIsAdding(false);
      } catch (error) {
        console.error('Ошибка при добавлении группы:', error);
      }
    }
  };

  const deleteStudent = (userId) =>{
    axios.delete(`http://localhost:5000/api/student/delete/${userId}`, {withCredentials : true})
    setStudents(students.filter(student => student.id !== userId));
  }

  const handleCancel = () => {
    setIsAdding(false);
    setNewStudent({
      firstName: "",
      lastName: "",
      middleName: "",
      roleId: 2,
      login: "",
      password: "",
      groupId : groupId
    });
  };

  return (
    <div className={styles.groupsContainer}>
      <div className={styles.courseFrame}>
        <h1>Группа: {group}</h1>
      </div>
      <h2>Студенты</h2>
      <ul className={styles.groupsList}>
        {students.map(student => (
          <li key={student.id} className={styles.groupItem}>
            <div>
              <div>Имя: {student.firstName}</div>
              <div>Фамилия: {student.lastName}</div>
              <div>Отчество: {student.middleName}</div>
              <div>Логин: {student.login}</div>
              <div>Пароль: {student.password}</div>
              <div>{student.roleId === 2 ? "Студент" : "Староста"}</div>
            </div>
            <button onClick={() => deleteStudent(student.id)} className={styles.deleteButton}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      {isAdding ? (
        <div className={styles.addGroupForm}>
          <input
            type="text"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent(prev => ({ ...prev, firstName: e.target.value }))}
            placeholder="Имя"
            className={styles.inputField}
          />
          <input
            type="text"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent(prev => ({ ...prev, lastName: e.target.value }))}
            placeholder="Фамилия"
            className={styles.inputField}
          />
          <input
            type="text"
            value={newStudent.middleName}
            onChange={(e) => setNewStudent(prev => ({ ...prev, middleName: e.target.value }))}
            placeholder="Отчество"
            className={styles.inputField}
          />
          <input
            type="text"
            value={newStudent.login}
            onChange={(e) => setNewStudent(prev => ({ ...prev, login: e.target.value }))}
            placeholder="Логин"
            className={styles.inputField}
          />
          <input
            type="password"
            value={newStudent.password}
            onChange={(e) => setNewStudent(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Пароль"
            className={styles.inputField}
          />
          <input
              type="checkbox"
              checked={newStudent.roleId === 3}
              onChange={(e) => setNewStudent(prev => ({ ...prev, roleId: e.target.checked ? 3 : 2 }))}
              className={styles.inputField}
            /> Староста
          <div className={styles.buttonContainer}>
            <button onClick={handleAddStudent} className={styles.confirmButton}>
              Добавить студента
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className={styles.addButton}>
          Добавить студента
        </button>
      )}
    </div>
  );
}
