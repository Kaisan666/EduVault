import styles from './addButton.module.css';
import React from 'react';

const AddTeacherButton = ({ setAdding }) => {
  return (
    <button 
      onClick={() => setAdding(true)} 
      className={styles.deleteButton}
    >
      Добавить преподавателя
    </button>
  );
};

export default AddTeacherButton;
