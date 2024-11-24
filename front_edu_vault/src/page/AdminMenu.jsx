// App.js
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer ';
import AdminMenu from '../components/main_admin';

function AdminMenuF() {
  return (
    <div className="App">
      <Header />
      <main>
        <AdminMenu />
        
      </main>
      <Footer />
    </div>
  );
}

export default AdminMenuF;
