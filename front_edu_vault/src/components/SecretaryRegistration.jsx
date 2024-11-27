import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/SecretaryRegistration.module.css';

const SecretaryRegistration = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  const handleCreateClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/create-secretary', {
        login,
        password,
      });
      console.log('Секретарь успешно создан:', response.data);
      setShowRegistration(false);
    } catch (error) {
      console.error('Ошибка при создании секретаря:', error);
    }
  };

  const handleAddSecretaryClick = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleAddSecretaryClick}>
        Создать секретаря
      </button>

      {showRegistration && (
        <div className={styles.registrationWindow}>
          <h2>Регистрация секретаря</h2>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Логин секретаря"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            className={styles.inputField}
            placeholder="Пароль секретаря"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} onClick={handleCreateClick}>
            Создать
          </button>
          <button className={styles.button} onClick={handleCloseRegistration}>
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};

export default SecretaryRegistration;
