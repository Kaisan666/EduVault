import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './teacherInputForm.module.css';
import { useParams } from 'react-router-dom';

const TeacherInputForm = ({teacherList, setTeachersList, setAdding}) => {

  // const {facultyId} = useParams()

  const [userData, setUserData] = useState({
    firstName : "",
    lastName : "",
    middleName : "",
    roleId : 5,
    password : "",
    login : ""
  })

  function closeRegistration(){
    setUserData({
      firstName : "",
    lastName : "",
    middleName : "",
    roleId : 5,
    password : "",
    login : "",
    })
    setAdding(false)
  }
  async function handleAddTeacher() {
    console.log(userData)
    const newTeacher = {...userData}
    console.log(newSecretary)
    const response = await axios.post(`http://localhost:5000/api/teacher/create-teacher/`, {
      withCredentials: true
    })
    setTeachersList({...teacherList, newTeacher})
    const data = response.data[0]
    console.log(data)
    closeRegistration()
    console.log(`Добавить секретаря: Логин:, Пароль:`);
  };

  

  return (<>
    <div className={styles.container}>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Имя"
        required={true}
        value={userData.firstName}
        onChange={(e) => setUserData({...userData, firstName : e.target.value})}
      />
      
      <input
        type="text"
        className={styles.inputField}
        placeholder="Фамилия"
        required={true}
        value={userData.lastName}
        onChange={(e) => setUserData({...userData, lastName : e.target.value})}
      />
      
      <input
        type="text"
        className={styles.inputField}
        placeholder="Отчество"
        value={userData.middleName}
        onChange={(e) => setUserData({...userData, middleName : e.target.value})}
      />
      
      <input
        type="text"
        className={styles.inputField}
        placeholder="Логин"
        required={true}
        value={userData.login}
        onChange={(e) => setUserData({...userData, login : e.target.value})}
      />
      <input
        type="password"
        className={styles.inputField}
        placeholder="Пароль"
        required={true}
        value={userData.password}
        onChange={(e) => setUserData({...userData, password : e.target.value})}
      />
      <button className={styles.button} onClick={handleAddTeacher}>
        Добавить секретаря
      </button>
      <button className={styles.closeButton} onClick={() =>closeRegistration()}>Закрыть</button>
    </div>
    </>
  );
};

export default TeacherInputForm;
