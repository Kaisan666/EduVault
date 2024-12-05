import axios from "axios";
import styles from "./deleteButton.module.css";
import React from "react";

const DeleteTeacher = ({ TeacherId, teacherList, setTeacherList }) => {
  const deleteStudent = (teacherId) => {
    axios
      .delete(`http://localhost:5000/api/teacher/delete/${teacherId}`, {
        withCredentials: true,
      })
      .then(() => {
        setTeacherList(teacherList.filter((teacher) => teacher.id !== teacherId));
      })
      .catch((error) => {
        console.error("Ошибка при удалении преподавателя:", error);
      });
  };

  return (
    <button 
      onClick={() => deleteStudent(TeacherId)} 
      className={styles.deleteButton}
    >
      Удалить
    </button>
  );
};

export default DeleteTeacher;
