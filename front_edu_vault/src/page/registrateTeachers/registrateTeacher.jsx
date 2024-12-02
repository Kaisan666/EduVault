import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './registrateTeacher.module.css';
import { useParams } from 'react-router-dom';
import TeacherInputForm from './components/inputForm/teacherInputForm';
import AddTeacherButton from './components/addButton/addButton'


const TeacherRegistration = ({}) => {


  const {facultyId} = useParams()
  const [teachers, setTeachers] = useState()
  const [isAdding, setIsAdding] = useState(false)
console.log(isAdding)
    const setAdding = (value) => {
        setIsAdding(value)
    }

  const setTeachersList = (value) =>{
    setTeachers(value)
  }

  function closeRegistration(){
    setUserData({
      firstName : "",
    lastName : "",
    middleName : "",
    roleId : 3,
    password : "",
    login : "",
    facultyId : facultyId
    })
    hideAddSecretary()
  }
  async function handleAddSecretary() {
    console.log(userData)
    const newSecretary = {...userData}
    console.log(newSecretary)
    const response = await axios.post(`http://localhost:5000/api/secretary/create/${facultyId}`, newSecretary)
    create(newSecretary)
    const data = response.data[0]
    console.log(data)
    hideAddSecretary()
    console.log(`Добавить секретаря: Логин:, Пароль:`);
  };

  

  return (
    <div className={styles.wrapper}>

    {isAdding ? <TeacherInputForm
    teacherList = {teachers}
    setTeachersList = {setTeachersList}
    setAdding = {setIsAdding}

    /> : null }
    
    <AddTeacherButton
    setAdding ={setAdding}
    />
    
    </div>
    )
}

export default TeacherRegistration;
