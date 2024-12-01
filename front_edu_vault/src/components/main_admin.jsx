  import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/main_admin.module.css';

function AdminMenu() {
  const [faculties, setFaculties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState('');

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faculty/all-faculties');
        if (response.status === 200) {
          setFaculties(response.data);
        } else {
          console.error('Ошибка при загрузке факультетов');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchFaculties();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewFacultyName('');
  };

  const handleAddFaculty = async () => {
    const newFaculty = {
      name: newFacultyName,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/faculty/create-faculty', newFaculty);

      if (response.status === 200 || response.status === 201) {
        const savedFaculty = response.data[0];
        setFaculties([...faculties, { id: savedFaculty.id, name: savedFaculty.name }]);
        closeModal();
      } else {
        console.error('Ошибка при добавлении факультета');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleDeleteFaculty = async (facultyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/${facultyId}`);
      setFaculties(faculties.filter(faculty => faculty.id !== facultyId));
    } catch (error) {
      console.error('Ошибка при удалении факультета:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h3 className={styles.heading}>Факультеты</h3>
        {faculties.map((faculty) => (
          <div className={styles.facultiesList} key={faculty.id}>
            <Link to={`/specialties/${faculty.id}`} className={styles.facultyItem}>
              {faculty.name}
            </Link>
            <button className={styles.deleteBtn} onClick={() => handleDeleteFaculty(faculty.id)}>удалить</button>
          </div>
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={openModal} className={styles.addButton}>Добавить факультет</button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalHeading}>Добавить факультет</h2>
            <input
              type="text"
              placeholder="Наименование факультета"
              value={newFacultyName}
              onChange={(e) => setNewFacultyName(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtonContainer}>
              <button onClick={handleAddFaculty} className={styles.confirmButton}>Добавить</button>
              <button onClick={closeModal} className={styles.cancelButton}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMenu;
