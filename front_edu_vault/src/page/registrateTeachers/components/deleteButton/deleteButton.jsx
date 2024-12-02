import axios from "axios";
import styles from "./deleteButton.module.css"

const deleteTeacher = ({TeacherId, teacherList, setTeacherList}) =>{
    

    const deleteStudent = (teacherId) =>{
        axios.delete(`http://localhost:5000/api/teacher/delete/${teacherId}`)
        setTeacherList(teacherList.filter(teacher => teacher.id !== teacherId));
      }

    return(
    <>
    <button onClick={() => deleteStudent(TeacherId)} className={styles.deleteButton}>
    Удалить
    </button>
  </>
  )
}
export default deleteTeacher

