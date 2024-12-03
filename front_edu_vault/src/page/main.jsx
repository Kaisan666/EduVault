// Main.js
import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from '../components/Context'; 
import Header from '../components/header';
import DisciplineList from '../components/DisciplineList';
import Footer from '../components/footer';
import styles from '../styles/main.module.css'; 
//import Switcher from '../components/switcher';

const MainContent = () => {
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.content}>
        
        <DisciplineList />
      </div>
      <Footer />
    </div>
  );
};

const Main = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default Main;
