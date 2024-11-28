import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/adding_directions.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SecretaryRegistration from './SecretaryRegistration';

function FacultyDetails({addSecretary, setAddSecretary, hideRegister }) {
  const { facultyId } = useParams();
  console.log(facultyId);
  const [directions, setDirections] = useState([]);
  const [newDirectionName, setNewDirectionName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretary, setSecretary] = useState([])


  const handleDeleteGroup = async (secretaryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/secretary/delete/${secretaryId}`)
      setSecretary(secretary.filter(secretary => secretary.id !== secretaryId));
    } catch (error) {
      console.error('Ошибка при удалении группы:', error);
    }
  };
  const createSecretary = (newSecretary) =>{
    setSecretary([...secretary, newSecretary])
  }
  // Загрузка всех специальностей для факультета при монтировании компонента
  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/specialty/all-specialties/${facultyId}`);
        console.log(response);
        if (response.status === 200) {
          setDirections(response.data);
        } else {
          console.error('Ошибка при загрузке направлений');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
    const fetchSecretaries = async() =>{
      try{
        const response = await axios.get(`http://localhost:5000/api/secretary/show-all/${facultyId}`)
        const data = response.data
        console.log(data)
        if (response.status === 201) {
          setSecretary(data);
        } else {
          console.error('Ошибка при загрузке направлений');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    fetchSecretaries()
    fetchDirections();
  }, []);

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
        {directions.map((direction) => (
          <Link to={`/courses/${direction.id}`} key={direction.id}>
            <div className={styles.directionItem}>
              {direction.name}
            </div>
          </Link>
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
      
      <div className={styles.wrapperOfMain}>
      <div className={styles.secretariesList}>
        {secretary.map((secretary) => (
            <div  key={secretary.id} className={styles.secretariesListItem}>
            <div>
              <div>Имя: {secretary.firstName}</div>
              <div>Фамилия: {secretary.lastName}</div>
              <div>Отчество: {secretary.middleName}</div>
              <div>Логин: {secretary.login}</div>
              <div>Пароль: {secretary.password}</div>
            </div>
            <button onClick={() => handleDeleteGroup(secretary.id)} className={styles.deleteButton}>
              Удалить
            </button>
            </div>
            
        ))}
      </div>
        <SecretaryRegistration
        create={createSecretary}
         addSecretary={addSecretary}
         hideAddSecretary={hideRegister}/>
        <button className={styles.addSecretaryBtn} onClick={() => setAddSecretary(true)}>Добавить секретаря</button>
      </div>
    </div>
  );
}

export default FacultyDetails;
