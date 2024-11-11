import React from 'react';
import FacultyBanner from '../components/FacultyBanner';
import SecretaryRegistration from '../components/SecretaryRegistration';
import Footer from '../components/footer ';
//import Header from '../components/header';
import FacultyDetails from '../components/adding_directions';

const AdminDirectionSecretary = () => {
  return (
    <div>
     
      <FacultyBanner facultyId="12345" />
      <FacultyDetails />
      <SecretaryRegistration />
      <Footer />
    </div>
  );
};

export default AdminDirectionSecretary;
