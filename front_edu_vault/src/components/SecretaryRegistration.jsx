import React, { useState } from 'react';
import styles from '../styles/SecretaryRegistration.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SecretaryRegistration = ({addSecretary, hideAddSecretary, create}) => {

  const {facultyId} = useParams()
  const [userData, setUserData] = useState({
    firstName : "",
    lastName : "",
    middleName : "",
    roleId : 3,
    password : "",
    login : "",
    facultyId : facultyId
  })


  async function handleAddSecretary() {
    const newSecretary = {...userData}
    console.log(newSecretary)
    const response = await axios.post(`http://localhost:5000/api/secretary/create/${facultyId}`, newSecretary)
    create(newSecretary)
    const data = response.data[0]
    console.log(data)
    hideAddSecretary()
    console.log(`Добавить секретаря: Логин:, Пароль:`);
  };

  return (<>
    {addSecretary ?(
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
      <button className={styles.button} onClick={handleAddSecretary}>
        Добавить секретаря
      </button>
      <button className={styles.closeButton} onClick={hideAddSecretary}>Закрыть</button>
    </div>) : null}
    </>
  );
};

export default SecretaryRegistration;
