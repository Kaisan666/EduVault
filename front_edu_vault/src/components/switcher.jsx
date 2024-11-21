
import React from 'react';
import { useTheme } from './Context'; 
import styles from '../styles/switcher.module.css';

const Switcher = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles.toggle} ${isDarkTheme ? styles.dark : styles.light}`}
      onClick={toggleTheme}
    >
      <span className={styles.label}>{isDarkTheme ? 'Темная тема' : 'Светлая тема'}</span>
    </div>
  );
};

export default Switcher;