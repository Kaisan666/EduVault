import React, { useState } from 'react';
import styles from '../styles/main_admin.module.css';

function AdminMenu() {
  const [faculties, setFaculties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState('');

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
      const response = await fetch('URL_бэка', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaculty),
      });

      if (response.ok) {
        const savedFaculty = await response.json();
        setFaculties([...faculties, { id: savedFaculty.id, name: savedFaculty.name }]);
        closeModal();
      } else {
        console.error('Ошибка при добавлении факультета');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h3 className={styles.heading}>Факультеты</h3>
        {faculties.map((faculty) => (
          <div key={faculty.id} className={styles.facultyItem}>
            {faculty.name}
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
