import React from 'react';
import styles from '../styles/FacultyBanner.module.css';

const FacultyBanner = ({ facultyId, handleLogout }) => {
  return (
    <div className={styles.facultyBanner}>
      <span>ID факультета: {facultyId}</span>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Выйти
      </button>
    </div>
  );
};

export default FacultyBanner;
