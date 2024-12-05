import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protection';
import Entrance from './page/page_input';
import DisciplineList from './components/DisciplineList';
import Switcher from './components/switcher';
import Main from './page/main';
import DisciplineCard from './components/DisciplineCard';
import LabWorksPage from './page/laboratory_work';
import LabWorkCard from './components/laba';
import LabPage from './page/laba_page';
import Admin_main_page from './page/admin_main_page';
import AdminMenu from './components/main_admin';
import AdminMenuF from './page/AdminMenu';
import FacultyBanner from './components/FacultyBanner';
import SecretaryRegistration from './components/SecretaryRegistration';
import AdminDirectionSecretary from './page/AdminDirectionSecretary';
import Secretary_Direction_Main from './components/Secretary_Direction_Main';
import Secretary_Direction from './page/Secretary_Direction_Main';
import Groups from './components/adminPanelGroupsDisciplines/Groups';
import LK from './page/lk';
import Courses from './components/courses';
import AddStudents from './page/AddingStudents/AddStudents';
import { AuthProvider } from './context/authContext';

const App = () => {
  return (

    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/secretaryDashBoard" element={<Secretary_Direction/>}/>
          <Route path="/adminDashboard" element={<AdminMenuF/>}/>
          <Route path="/specialties/:facultyId" element={<AdminDirectionSecretary />} />
          <Route path="/courses/:specialtyId" element={<Courses />} />
          <Route path="/groups/:courseId" element={<Groups/>}/>
          <Route path="/students/:groupId" element={<AddStudents/>}/>
      
          <Route path="/" element={<Entrance/>} />
          <Route path="/PersonalCabinet" element={<LK/>}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="/LabsPage/:disciplineId" element={<LabWorksPage/>} />
          <Route path="/lab/:fileId" element={<LabPage/>}/>
      
      
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
