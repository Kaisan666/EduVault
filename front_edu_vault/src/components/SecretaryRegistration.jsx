import React, { useState } from 'react';
import styles from '../styles/SecretaryRegistration.module.css';

const SecretaryRegistration = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateClick = () => {

    console.log(`Создать аккаунт: Логин: ${login}, Пароль: ${password}`);
  };

  const handleAddSecretaryClick = () => {

    console.log(`Добавить секретаря: Логин: ${login}, Пароль: ${password}`);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        className={styles.inputField}
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.button} onClick={handleCreateClick}>
        Создать
      </button>
      <button className={styles.button} onClick={handleAddSecretaryClick}>
        Добавить секретаря
      </button>
    </div>
  );
};

export default SecretaryRegistration;
