import React from 'react';
import FacultyBanner from '../components/FacultyBanner';
import Secretary_Direction_Main from '../components/Secretary_Direction_Main';

const Secretary_Direction = () => {
  const facultyId = '123'; 
  return (
    <div>
      <FacultyBanner facultyId={facultyId} />
      <Secretary_Direction_Main />
    </div>
  );
};

export default Secretary_Direction;
