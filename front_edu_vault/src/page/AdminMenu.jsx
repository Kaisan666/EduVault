// App.js
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer ';
import AdminMenu from '../components/main_admin';

function AdminMenuF() {
  return (
    <>
      <Header />
      <main>
        <AdminMenu />
        
      </main>
      <Footer />
      </>
  );
}

export default AdminMenuF;
