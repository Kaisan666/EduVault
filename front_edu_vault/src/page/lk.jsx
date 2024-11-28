import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer ';
import PersonalCabinet from '../components/PersonalCabinet';
import styles from '../styles/LK.module.css';

const LK = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <PersonalCabinet />
      </main>
      <Footer />
    </div>
  );
};

export default LK;
