import React, { useState } from 'react';
import FacultyBanner from '../components/FacultyBanner';

import Footer from '../components/footer ';
//import Header from '../components/header';
import FacultyDetails from '../components/facultyDetails';

const AdminDirectionSecretary = () => {
  const [addSecretary, setAddSecretary] = useState(false)
  console.log(addSecretary)
  function registerSecretary(){
    setAddSecretary(true)
  }
  function hideRegister(){
    setAddSecretary(false)
  }

  return (
    <div>
     
      <FacultyBanner />
      <FacultyDetails
      addSecretary={addSecretary}
      setAddSecretary={registerSecretary}
      hideRegister = {hideRegister}/>
      
      <Footer />
    </div>
  );
};

export default AdminDirectionSecretary;
