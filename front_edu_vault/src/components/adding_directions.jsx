import React, { useState, useEffect } from 'react';
import styles from '../styles/adding_directions.module.css';

function FacultyDetails({ facultyId }) {
  const [directions, setDirections] = useState([]);
  const [newDirectionName, setNewDirectionName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewDirectionName('');
  };

  const handleAddDirection = async () => {
    const newDirection = { name: newDirectionName };

    try {
      const response = await fetch(`/api/faculties/${facultyId}/directions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDirection),
      });

      if (response.ok) {
        const savedDirection = await response.json();
        setDirections([...directions, savedDirection]);
        closeModal();
      } else {
        console.error('Ошибка при добавлении направления');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={styles.facultyContainer}>
      <div className={styles.sidebar}>
        {directions.map((direction) => (
          <div key={direction.id} className={styles.directionItem}>
            {direction.name}
          </div>
        ))}
        <button onClick={openModal} className={styles.addDirectionButton}>
          Добавить направление
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalHeading}>Добавить направление</h2>
            <input
              type="text"
              placeholder="Наименование направления"
              value={newDirectionName}
              onChange={(e) => setNewDirectionName(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtonContainer}>
              <button onClick={handleAddDirection} className={styles.confirmButton}>
                Добавить
              </button>
              <button onClick={closeModal} className={styles.cancelButton}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyDetails;
