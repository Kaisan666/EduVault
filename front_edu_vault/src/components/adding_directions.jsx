import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/adding_directions.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FacultyDetails() {
  const { facultyId } = useParams();
  console.log(facultyId);
  const [directions, setDirections] = useState([]);
  const [newDirectionName, setNewDirectionName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Загрузка всех специальностей для факультета при монтировании компонента
  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/specialty/all-specialties/${facultyId}`);
        console.log(response)
        if (response.status === 200) {
          setDirections(response.data);
        } else {
          console.error('Ошибка при загрузке направлений');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchDirections();
  }, [facultyId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewDirectionName('');
  };

  const handleAddDirection = useCallback(async () => {
    const newDirection = { name: newDirectionName };

    try {
      const response = await axios.post(`http://localhost:5000/api/specialty/create-specialty/${facultyId}`, newDirection);
      if (response.status === 200 || response.status === 201) {
        const savedDirection = response.data[0];
        setDirections((prevDirections) => [...prevDirections, savedDirection]);
        closeModal();
      } else {
        console.error('Ошибка при добавлении направления');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }, [newDirectionName, facultyId]);

  return (
    <div className={styles.facultyContainer}>
      <div className={styles.sidebar}>
        {directions.map((direction) => (<div className={styles.directionItem}key={direction.id}>
          
            <Link to={`/courses/all-courses/${direction.id}`}>
              {direction.name}
            </Link>
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
