// FullScreenLogin.js
import React from 'react';
import LoginForm from '../components/entrance';
import styles from '../styles//page_input.module.css';
import backgroundImage from '../images/fon.png'; 

const Entrance = () => {
  return (
    <div className={styles.Entrance}>
      <img src={backgroundImage} alt="" className={styles.backgroundImage} />
      <div className={styles.overlay}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Entrance;
