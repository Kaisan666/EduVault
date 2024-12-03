// App.js
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import AdminMenu from '../components/main_admin';
import TeacherRegistration from './registrateTeachers/registrateTeacher';
import styles from "./stylesforAdminMenu.module.css"

function AdminMenuF() {
  return (
    <>
      <Header />
      <main className={styles.main}>

        <AdminMenu/>
        <TeacherRegistration/>

        
      </main>
      <Footer />
      </>
  );
}

export default AdminMenuF;
